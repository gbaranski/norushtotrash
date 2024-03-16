import { NFT_STORAGE_API_KEY } from '$env/static/private'
import { NFTStorage, File } from 'nft.storage'

const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })

export const storeImage = (file: File) => client.storeBlob(file)