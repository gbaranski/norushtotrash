import { JsonRpcSigner } from 'ethers';
import { writable } from 'svelte/store';
// import { Client } from '@xmtp/xmtp-js';

export const signer = writable<JsonRpcSigner>();
// export const xmtp = writable<Client>();

export const loading = writable<boolean>(false);