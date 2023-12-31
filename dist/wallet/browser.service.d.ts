import { IInitiator, ISigner, ISubmitter } from '@mesh/common/contracts';
import type { Address, TransactionUnspentOutput } from '@mesh/core';
import type { Asset, AssetExtended, DataSignature, UTxO, Wallet } from '@mesh/common/types';
export declare class BrowserWallet implements IInitiator, ISigner, ISubmitter {
    private readonly _walletInstance;
    private constructor();
    static getInstalledWallets(): Wallet[];
    static enable(walletName: string): Promise<BrowserWallet>;
    getBalance(): Promise<Asset[]>;
    getChangeAddress(): Promise<string>;
    getCollateral(limit?: number): Promise<UTxO[]>;
    getNetworkId(): Promise<number>;
    getRewardAddresses(): Promise<string[]>;
    getUnusedAddresses(): Promise<string[]>;
    getUsedAddresses(): Promise<string[]>;
    getUtxos(): Promise<UTxO[]>;
    signData(address: string, payload: string): Promise<DataSignature>;
    signTx(unsignedTx: string, partialSign?: boolean): Promise<string>;
    submitTx(tx: string): Promise<string>;
    getUsedAddress(): Promise<Address>;
    getUsedCollateral(limit?: number): Promise<TransactionUnspentOutput[]>;
    getUsedUTxOs(): Promise<TransactionUnspentOutput[]>;
    getAssets(): Promise<AssetExtended[]>;
    getLovelace(): Promise<string>;
    getPolicyIdAssets(policyId: string): Promise<AssetExtended[]>;
    getPolicyIds(): Promise<string[]>;
    private static resolveInstance;
}
declare global {
    interface Window {
        cardano: Cardano;
    }
}
type Cardano = {
    [key: string]: {
        name: string;
        icon: string;
        apiVersion: string;
        enable: () => Promise<WalletInstance>;
    };
};
type WalletInstance = {
    experimental: ExperimentalFeatures;
    getBalance(): Promise<string>;
    getChangeAddress(): Promise<string>;
    getNetworkId(): Promise<number>;
    getRewardAddresses(): Promise<string[]>;
    getUnusedAddresses(): Promise<string[]>;
    getUsedAddresses(): Promise<string[]>;
    getUtxos(): Promise<string[] | undefined>;
    signData(address: string, payload: string): Promise<DataSignature>;
    signTx(tx: string, partialSign: boolean): Promise<string>;
    submitTx(tx: string): Promise<string>;
};
type ExperimentalFeatures = {
    getCollateral(): Promise<string[] | undefined>;
};
export {};
