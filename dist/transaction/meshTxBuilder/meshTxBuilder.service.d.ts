import { IEvaluator, IFetcher, ISubmitter } from '@mesh/common/contracts';
import { MeshTxBuilderCore } from './meshTxBuilderCore';
import { MeshTxBuilderBody } from './type';
type MeshTxBuilderOptions = {
    fetcher?: IFetcher;
    submitter?: ISubmitter;
    evaluator?: IEvaluator;
    isHydra?: boolean;
};
/**
 * MeshTxBuilder is a lower level api for building transaction
 * @param {IFetcher} [fetcher] an optional parameter for fetching utxo
 * @param {ISubmitter} [submitter] an optional parameter for submitting transaction
 * @param {IEvaluator} [evaluator] an optional parameter for evaluating transaction
 * @param {boolean} [isHydra] an optional parameter for using hydra transaction building for configuring 0 fee in protocol parameters
 */
export declare class MeshTxBuilder extends MeshTxBuilderCore {
    private _fetcher?;
    private _submitter?;
    private _evaluator?;
    private queriedTxHashes;
    private queriedUTxOs;
    constructor({ fetcher, submitter, evaluator, isHydra, }: MeshTxBuilderOptions);
    /**
     * It builds the transaction and query the blockchain for missing information
     * @param customizedTx The optional customized transaction body
     * @returns The signed transaction in hex ready to submit / signed by client
     */
    complete: (customizedTx?: MeshTxBuilderBody) => Promise<this>;
    /**
     * Submit transactions to the blockchain using the fetcher instance
     * @param txHex The signed transaction in hex
     * @returns
     */
    submitTx: (txHex: string) => Promise<string | undefined>;
    /**
     * Get the UTxO information from the blockchain
     * @param TxHash The TxIn object that contains the txHash and txIndex, while missing amount and address information
     */
    private getUTxOInfo;
    private queryAllTxInfo;
    private completeTxInformation;
    private isInputComplete;
    private isInputInfoComplete;
    private isRefScriptInfoComplete;
}
export {};
