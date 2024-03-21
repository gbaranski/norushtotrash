import type { Eip1193Provider } from 'ethers';
import type { LayoutLoad } from './$types';
import { BrowserProvider } from 'ethers';
import { NoRushToTrash__factory, type NoRushToTrash, type MCO2Token, MCO2Token__factory } from '../../../sc/typechain-types';
import deployments from '../../../sc/deployments.json';
import { Buffer } from 'buffer';

export const ssr = false;

export const load: LayoutLoad = async () => {
	window.Buffer = window.Buffer ?? Buffer;
	//@ts-ignore
	const ethereum = window.ethereum as Eip1193Provider | undefined;
	const provider = ethereum ? new BrowserProvider(ethereum) : undefined;
	const contract = NoRushToTrash__factory.connect(deployments['84532'].NoRushToTrash, provider);
	const carbonContract = MCO2Token__factory.connect(deployments['84532'].MCO2Token, provider);

	return {
		provider: provider!,
		contract: contract! as NoRushToTrash,
		carbonContract: carbonContract! as MCO2Token
	};
};
