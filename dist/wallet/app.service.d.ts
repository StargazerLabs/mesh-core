import { IFetcher, IInitiator, ISigner, ISubmitter } from '@mesh/common/contracts';
import type { Address, TransactionUnspentOutput } from '@mesh/core';
import type { DataSignature } from '@mesh/common/types';
export type CreateAppWalletOptions = {
    networkId: number;
    fetcher: IFetcher;
    submitter: ISubmitter;
    key: {
        type: 'root';
        bech32: string;
    } | {
        type: 'cli';
        payment: string;
        stake?: string;
    } | {
        type: 'mnemonic';
        words: string[];
    };
};
export declare class AppWallet implements IInitiator, ISigner, ISubmitter {
    private readonly _fetcher;
    private readonly _submitter;
    private readonly _wallet;
    constructor(options: CreateAppWalletOptions);
    getBaseAddress(accountIndex?: number): string;
    getPaymentAddress(accountIndex?: number): string;
    getRewardAddress(accountIndex?: number): string;
    getUsedAddress(accountIndex?: number): Address;
    getUsedCollateral(_limit?: number): Promise<TransactionUnspentOutput[]>;
    getUsedUTxOs(accountIndex?: number): Promise<TransactionUnspentOutput[]>;
    signData(address: string, payload: string, accountIndex?: number): DataSignature;
    signTx(unsignedTx: string, partialSign?: boolean, accountIndex?: number): Promise<string>;
    submitTx(tx: string): Promise<string>;
    static brew(strength?: number): string[];
}
