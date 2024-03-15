// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import the ERC20 interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NoRushToTrash {
    struct Item {
        uint256 id;
        address owner;
        string title;
        string description;
        string location;
        bool isReserved;
    }

    struct Escrow {
        uint256 itemId;
        address buyer;
        bool sellerConfirmed;
        bool buyerConfirmed;
    }

    uint256 public itemCount = 0;
    mapping(uint256 => Item) public items;
    mapping(uint256 => Escrow) public escrows;
    IERC20 public carbonToken;

    uint256 public constant rewardAmount = 10 * 10**18; 

    event ItemPosted(uint256 indexed itemId, address owner, string title);
    event ItemCancelled(uint256 indexed itemId);
    event ItemReserved(uint256 indexed itemId, address buyer);
    event TransactionConfirmed(uint256 indexed itemId, address by);

    constructor(address _co2TokenAddress) {
        carbonToken = IERC20(_co2TokenAddress);
    }

    function postItem(string calldata _title, string calldata _description, string calldata _location) external {
        uint256 newItemId = itemCount++;
        items[newItemId] = Item(newItemId, msg.sender, _title, _description, _location, false);
        emit ItemPosted(newItemId, msg.sender, _title);
    }

    function cancelItem(uint256 _itemId) external {
        require(items[_itemId].owner == msg.sender, "Not the owner");
        require(!items[_itemId].isReserved, "Item is reserved");
        delete items[_itemId];
        emit ItemCancelled(_itemId);
    }

    function reserveItem(uint256 _itemId) external {
        require(!items[_itemId].isReserved, "Already reserved");
        items[_itemId].isReserved = true;
        carbonToken.transferFrom(msg.sender, address(this), rewardAmount);
        escrows[_itemId] = Escrow(_itemId, msg.sender, false, false);
        emit ItemReserved(_itemId, msg.sender);
    }

    function confirmTransaction(uint256 _itemId, bool _isSeller) external {
        Escrow storage escrow = escrows[_itemId];
        require(escrow.buyer == msg.sender || items[_itemId].owner == msg.sender, "Not part of this transaction");
        if (_isSeller) {
            require(items[_itemId].owner == msg.sender, "Not the seller");
            escrow.sellerConfirmed = true;
        } else {
            require(escrow.buyer == msg.sender, "Not the buyer");
            escrow.buyerConfirmed = true;
        }
        if (escrow.sellerConfirmed && escrow.buyerConfirmed) {
            carbonToken.transfer(escrow.buyer, rewardAmount / 2); // Half to the buyer
            carbonToken.transfer(items[_itemId].owner, rewardAmount / 2); // Half to the seller (now former owner)
            delete items[_itemId]; // Remove the item as it is now transacted
            delete escrows[_itemId]; // Close the escrow
        }
        emit TransactionConfirmed(_itemId, msg.sender);
    }
}
