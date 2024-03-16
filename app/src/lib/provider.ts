import { getContext, hasContext, setContext } from 'svelte';
import { BrowserProvider } from 'ethers';

const ETHEREUM = Symbol('eth');

declare const ethereum: import('ethers').Eip1193Provider | undefined;

function create() {
    return typeof ethereum === 'undefined' ? null : new BrowserProvider(ethereum);
}

type Provider = ReturnType<typeof create>;

export function init() {
    const provider = create();
    setContext(ETHEREUM, provider);
}

export function get() {
    if (!hasContext(ETHEREUM)) throw new Error('provider not yet initialized');
    return getContext<Provider>(ETHEREUM);
}