import type { Eip1193Provider } from 'ethers';
import type { LayoutLoad } from './$types';
import { BrowserProvider } from 'ethers';
import { NoRushToTrash__factory, type NoRushToTrash } from '../../../sc/typechain-types';
import { PUBLIC_SC_NORUSHTOTRASH_ADDRESS } from '$env/static/public';
import deployments from '../../../sc/deployments.json';

export const ssr = false;

export const load: LayoutLoad = async () => {
	//@ts-ignore
	const ethereum = window.ethereum as Eip1193Provider | undefined;
	const provider = ethereum ? new BrowserProvider(ethereum) : undefined;
	const contract = NoRushToTrash__factory.connect(deployments['44787'].NoRushToTrash, provider);

	return {
		provider: provider!,
		contract: contract! as NoRushToTrash
	};
};
