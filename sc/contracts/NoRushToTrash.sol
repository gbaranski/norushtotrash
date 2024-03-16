// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the ERC20 interface
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NoRushToTrash {
    struct listing {
        uint256 id;
        address owner;
        string title;
        string category;
        string description;
        string condition;
        string location;
        bool isReserved;
        string cid; // CID for IPFS
        uint256 creationTime; // Block timestamp for creation time
    }

    struct Escrow {
        uint256 listingId;
        address buyer;
        bool sellerConfirmed;
        bool buyerConfirmed;
    }

    uint256 public listingCount = 0;
    mapping(uint256 => listing) public listings;
    mapping(uint256 => Escrow) public escrows;
    IERC20 public carbonToken;

    uint256 public constant rewardAmount = 10; 

    event listingPosted(uint256 indexed listingId, address owner, string title);
    event listingCancelled(uint256 indexed listingId);
    event listingReserved(uint256 indexed listingId, address buyer);
    event TransactionConfirmed(uint256 indexed listingId, address by);

    constructor(address _co2TokenAddress) {
        carbonToken = IERC20(_co2TokenAddress);
    }

    function postListing(string calldata _title, string calldata _category, string calldata _description, string calldata _condition, string calldata _location, string calldata _cid) external {
        uint256 newListingId = listingCount++;
        listings[newListingId] = listing(
            newListingId,
            msg.sender,
            _title,
            _category,
            _description,
            _condition,
            _location,
            false,
            _cid,
            block.timestamp // Set the creation time to the current block timestamp
        );
        emit listingPosted(newListingId, msg.sender, _title);
    }

    function cancelListing(uint256 _listingId) external {
        require(listings[_listingId].owner == msg.sender, "Not the owner");
        require(!listings[_listingId].isReserved, "Listing is reserved");
        delete listings[_listingId];
        emit listingCancelled(_listingId);
    }

    function reserveListing(uint256 _listingId) external {
        require(!listings[_listingId].isReserved, "Already reserved");
        listings[_listingId].isReserved = true;
        carbonToken.transferFrom(msg.sender, address(this), rewardAmount);
        escrows[_listingId] = Escrow(_listingId, msg.sender, false, false);
        emit listingReserved(_listingId, msg.sender);
    }

    function confirmTransaction(uint256 _listingId, bool _isSeller) external {
        Escrow storage escrow = escrows[_listingId];
        require(escrow.buyer == msg.sender || listings[_listingId].owner == msg.sender, "Not part of this transaction");
        if (_isSeller) {
            require(listings[_listingId].owner == msg.sender, "Not the seller");
            escrow.sellerConfirmed = true;
        } else {
            require(escrow.buyer == msg.sender, "Not the buyer");
            escrow.buyerConfirmed = true;
        }
        if (escrow.sellerConfirmed && escrow.buyerConfirmed) {
            carbonToken.transfer(escrow.buyer, rewardAmount / 2); // Half to the buyer
            carbonToken.transfer(listings[_listingId].owner, rewardAmount / 2); // Half to the seller (now former owner)
            delete listings[_listingId]; // Remove the listing as it is now transacted
            delete escrows[_listingId]; // Close the escrow
        }
        emit TransactionConfirmed(_listingId, msg.sender);
    }
}
