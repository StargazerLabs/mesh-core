import { IEvaluator, IFetcher, ISubmitter } from '@mesh/common/contracts';
import type { AccountInfo, Action, Asset, AssetMetadata, BlockInfo, Protocol, TransactionInfo, UTxO } from '@mesh/common/types';
export type MaestroSupportedNetworks = 'Mainnet' | 'Preprod' | 'Preview';
export interface MaestroConfig {
    network: MaestroSupportedNetworks;
    apiKey: string;
    turboSubmit?: boolean;
}
export declare class MaestroProvider implements IFetcher, ISubmitter, IEvaluator {
    private readonly _axiosInstance;
    private readonly _amountsAsStrings;
    submitUrl: string;
    constructor({ network, apiKey, turboSubmit }: MaestroConfig);
    evaluateTx(cbor: string): Promise<Omit<Action, 'data'>[]>;
    fetchAccountInfo(address: string): Promise<AccountInfo>;
    fetchAddressUTxOs(address: string, asset?: string): Promise<UTxO[]>;
    fetchAssetAddresses(asset: string): Promise<{
        address: string;
        quantity: string;
    }[]>;
    fetchAssetMetadata(asset: string): Promise<AssetMetadata>;
    fetchBlockInfo(hash: string): Promise<BlockInfo>;
    fetchCollectionAssets(policyId: string, cursor?: string): Promise<{
        assets: Asset[];
        next: string | number | null;
    }>;
    fetchHandleAddress(handle: string): Promise<string>;
    fetchProtocolParameters(epoch?: number): Promise<Protocol>;
    fetchTxInfo(hash: string): Promise<TransactionInfo>;
    fetchUTxOs(hash: string): Promise<UTxO[]>;
    onTxConfirmed(txHash: string, callback: () => void, limit?: number): void;
    submitTx(tx: string): Promise<string>;
    private toUTxO;
    private resolveScript;
}
