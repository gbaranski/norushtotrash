import { JsonRpcSigner } from "ethers";
import { writable } from "svelte/store";

export const signer = writable<JsonRpcSigner>();