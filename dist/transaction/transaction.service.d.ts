import { IInitiator } from '@mesh/common/contracts';
import type { Action, Asset, Data, Era, Mint, Protocol, PlutusScript, PoolParams, Recipient, Token, UTxO } from '@mesh/common/types';
export declare class Transaction {
    private _changeAddress?;
    private _txOutputs;
    private _recipients;
    private _totalBurns;
    private _totalMints;
    private readonly _era?;
    private readonly _initiator?;
    private readonly _mintBuilder;
    private readonly _protocolParameters;
    private readonly _txBuilder;
    private readonly _txCertificates;
    private readonly _txInputsBuilder;
    private readonly _txWithdrawals;
    constructor(options?: Partial<CreateTxOptions>);
    static maskMetadata(cborTx: string, era?: Era): string;
    static readMetadata(cborTx: string): string;
    static writeMetadata(cborTx: string, cborTxMetadata: string, era?: Era): string;
    get size(): number;
    build(): Promise<string>;
    burnAsset(forgeScript: string | PlutusScript | UTxO, asset: Asset, redeemer?: Partial<Action>): Transaction;
    delegateStake(rewardAddress: string, poolId: string): Transaction;
    deregisterStake(rewardAddress: string): Transaction;
    mintAsset(forgeScript: string | PlutusScript | UTxO, mint: Mint, redeemer?: Partial<Action>): Transaction;
    redeemValue(options: {
        value: UTxO;
        script: PlutusScript | UTxO;
        datum: Data | UTxO;
        redeemer?: Action;
    }): Transaction;
    registerStake(rewardAddress: string): Transaction;
    registerPool(params: PoolParams): Transaction;
    retirePool(poolId: string, epochNo: number): Transaction;
    /**
     * Adds an output to the transaction.
     *
     * @param recipient The recipient of the output.
     * @param assets The assets to send.
     * @returns The transaction builder.
     * @see {@link https://meshjs.dev/apis/transaction#sendAssets}
     */
    sendAssets(recipient: Recipient, assets: Asset[]): Transaction;
    /**
     * Adds a transaction output to the transaction.
     *
     * @param {Recipient} recipient The recipient of the transaction.
     * @param {string} lovelace The amount of lovelace to send.
     * @returns {Transaction} The Transaction object.
     * @see {@link https://meshjs.dev/apis/transaction#sendAda}
     */
    sendLovelace(recipient: Recipient, lovelace: string): Transaction;
    /**
     * Adds stable coins transaction output to the transaction.
     * @param {Recipient} recipient The recipient of the transaction.
     * @param {Token} ticker The ticker of the token to send.
     * @param {string} amount The amount of the token to send.
     * @returns {Transaction} The Transaction object.
     * @see {@link https://meshjs.dev/apis/transaction#sendToken}
     */
    sendToken(recipient: Recipient, ticker: Token, amount: string): Transaction;
    /**
     * Adds an output to the transaction.
     *
     * @param {Recipient} recipient The recipient of the output.
     * @param {UTxO} value The UTxO value of the output.
     * @returns {Transaction} The Transaction object.
     */
    sendValue(recipient: Recipient, value: UTxO): Transaction;
    /**
     * Sets the change address for the transaction.
     *
     * @param {string} changeAddress The change address.
     * @returns {Transaction} The Transaction object.
     */
    setChangeAddress(changeAddress: string): Transaction;
    /**
     * Sets the collateral for the transaction.
     *
     * @param {UTxO[]} collateral - Set the UTxO for collateral.
     * @returns {Transaction} The Transaction object.
     */
    setCollateral(collateral: UTxO[]): Transaction;
    /**
     * Add a JSON metadata entry to the transaction.
     *
     * @param {number} key The key to use for the metadata entry.
     * @param {unknown} value The value to use for the metadata entry.
     * @returns {Transaction} The Transaction object.
     * @see {@link https://meshjs.dev/apis/transaction#setMetadata}
     */
    setMetadata(key: number, value: unknown): Transaction;
    /**
     * Sets the required signers for the transaction.
     *
     * @param {string[]} addresses The addresses of the required signers.
     * @returns {Transaction} The Transaction object.
     */
    setRequiredSigners(addresses: string[]): Transaction;
    /**
     * Sets the start slot for the transaction.
     *
     * @param {string} slot The start slot for the transaction.
     * @returns {Transaction} The Transaction object.
     * @see {@link https://meshjs.dev/apis/transaction#setTimeLimit}
     */
    setTimeToStart(slot: string): Transaction;
    /**
     * Set the time to live for the transaction.
     *
     * @param {string} slot The slot number to expire the transaction at.
     * @returns {Transaction} The Transaction object.
     * @see {@link https://meshjs.dev/apis/transaction#setTimeLimit}
     */
    setTimeToExpire(slot: string): Transaction;
    /**
     * Sets the inputs for the transaction.
     *
     * @param {UTxO[]} inputs The inputs to set.
     * @returns {Transaction} The transaction.
     */
    setTxInputs(inputs: UTxO[]): Transaction;
    /**
     * Sets the reference inputs for the transaction.
     *
     * @param {UTxO[]} inputs The reference inputs to set.
     * @returns {Transaction} The transaction.
     */
    setTxRefInputs(inputs: UTxO[]): Transaction;
    withdrawRewards(rewardAddress: string, lovelace: string): Transaction;
    private addBurnInputsIfNeeded;
    private addChangeAddress;
    private addCollateralIfNeeded;
    private addRequiredSignersIfNeeded;
    private addTxInputsAsNeeded;
    private forgeAssetsIfNeeded;
    private filterAvailableUTxOs;
    private addMintOutputs;
    private notVisited;
    private setTxOutput;
}
type CreateTxOptions = {
    initiator: IInitiator;
    parameters: Protocol;
    era: Era;
};
export {};
