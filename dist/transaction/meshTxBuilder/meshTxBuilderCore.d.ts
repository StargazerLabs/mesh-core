import { Action, Asset, Data, LanguageVersion, Protocol, UTxO } from '@mesh/common/types';
import { csl } from '@mesh/core';
import { MintItem, TxIn, PubKeyTxIn, MeshTxBuilderBody, RefTxIn, BuilderData } from './type';
export declare class MeshTxBuilderCore {
    txHex: string;
    txBuilder: csl.TransactionBuilder;
    txEvaluationMultiplier: number;
    private _protocolParams;
    private txOutput?;
    private addingScriptInput;
    private addingPlutusMint;
    protected isHydra: boolean;
    meshTxBuilderBody: MeshTxBuilderBody;
    protected mintItem?: MintItem;
    protected txInQueueItem?: TxIn;
    protected collateralQueueItem?: PubKeyTxIn;
    protected refScriptTxInQueueItem?: RefTxIn;
    /**
     * Reset everything in the MeshTxBuilder instance
     * @returns The MeshTxBuilder instance
     */
    reset: () => this;
    /**
     * Make an empty transaction body for building transaction in object
     * @returns An empty transaction body
     */
    emptyTxBuilderBody: () => MeshTxBuilderBody;
    constructor();
    /**
     * Synchronous functions here
     */
    /**
     * It builds the transaction without dependencies
     * @param customizedTx The optional customized transaction body
     * @returns The signed transaction in hex ready to submit / signed by client
     */
    completeSync: (customizedTx?: MeshTxBuilderBody) => this;
    /**
     * Complete the signing process
     * @returns The signed transaction in hex
     */
    completeSigning: () => string;
    private serializeTxBody;
    /**
     * Set the input for transaction
     * @param txHash The transaction hash of the input UTxO
     * @param txIndex The transaction index of the input UTxO
     * @param amount The asset amount of index of the input UTxO
     * @param address The address of the input UTxO
     * @returns The MeshTxBuilder instance
     */
    txIn: (txHash: string, txIndex: number, amount?: Asset[], address?: string) => this;
    /**
     * Set the script for transaction input
     * @param {string} scriptCbor The CborHex of the script
     * @param version Optional - The Plutus script version
     * @returns The MeshTxBuilder instance
     */
    txInScript: (scriptCbor: string, version?: LanguageVersion) => this;
    /**
     * Set the input datum for transaction input
     * @param datum The datum in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param type The datum type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    txInDatumValue: (datum: BuilderData['content'], type?: BuilderData['type']) => this;
    /**
     * Tell the transaction builder that the input UTxO has inlined datum
     * @returns The MeshTxBuilder instance
     */
    txInInlineDatumPresent: () => this;
    /**
     * Set the redeemer for the reference input to be spent in same transaction
     * @param redeemer The redeemer in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param exUnits The execution units budget for the redeemer
     * @param type The redeemer data type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    txInRedeemerValue: (redeemer: BuilderData['content'], exUnits?: {
        mem: number;
        steps: number;
    }, type?: BuilderData['type']) => this;
    /**
     * Set the output for transaction
     * @param {string} address The recipient of the output
     * @param {Asset[]} amount The amount of other native assets attached with UTxO
     * @returns The MeshTxBuilder instance
     */
    txOut: (address: string, amount: Asset[]) => this;
    /**
     * Set the output datum hash for transaction
     * @param datum The datum in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param type The datum type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    txOutDatumHashValue: (datum: BuilderData['content'], type?: BuilderData['type']) => this;
    /**
     * Set the output inline datum for transaction
     * @param datum The datum in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param type The datum type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    txOutInlineDatumValue: (datum: BuilderData['content'], type?: BuilderData['type']) => this;
    /**
     * Set the reference script to be attached with the output
     * @param scriptCbor The CBOR hex of the script to be attached to UTxO as reference script
     * @param version Optional - The Plutus script version
     * @returns The MeshTxBuilder instance
     */
    txOutReferenceScript: (scriptCbor: string, version?: LanguageVersion) => this;
    /**
     * Set the instruction that it is currently using V2 Plutus spending scripts
     * @returns The MeshTxBuilder instance
     */
    spendingPlutusScriptV2: () => this;
    /**
     * Set the reference input where it would also be spent in the transaction
     * @param txHash The transaction hash of the reference UTxO
     * @param txIndex The transaction index of the reference UTxO
     * @param spendingScriptHash The script hash of the spending script
     * @returns The MeshTxBuilder instance
     */
    spendingTxInReference: (txHash: string, txIndex: number, spendingScriptHash?: string, version?: LanguageVersion) => this;
    /**
     * [Alias of txInInlineDatumPresent] Set the instruction that the reference input has inline datum
     * @returns The MeshTxBuilder instance
     */
    spendingReferenceTxInInlineDatumPresent: () => this;
    /**
     * [Alias of txInRedeemerValue] Set the redeemer for the reference input to be spent in same transaction
     * @param redeemer The redeemer in object format
     * @param exUnits The execution units budget for the redeemer
     * @returns The MeshTxBuilder instance
     */
    spendingReferenceTxInRedeemerValue: (redeemer: Data, exUnits?: {
        mem: number;
        steps: number;
    }) => this;
    /**
     * Specify a read only reference input. This reference input is not witnessing anything it is simply provided in the plutus script context.
     * @param txHash The transaction hash of the reference UTxO
     * @param txIndex The transaction index of the reference UTxO
     * @returns The MeshTxBuilder instance
     */
    readOnlyTxInReference: (txHash: string, txIndex: number) => this;
    /**
     * Set the instruction that it is currently using V2 Plutus minting scripts
     * @returns The MeshTxBuilder instance
     */
    mintPlutusScriptV2: () => this;
    /**
     * Set the minting value of transaction
     * @param quantity The quantity of asset to be minted
     * @param policy The policy id of the asset to be minted
     * @param name The hex of token name of the asset to be minted
     * @returns The MeshTxBuilder instance
     */
    mint: (quantity: number, policy: string, name: string) => this;
    /**
     * Set the minting script of current mint
     * @param scriptCBOR The CBOR hex of the minting policy script
     * @param version Optional - The Plutus script version
     * @returns The MeshTxBuilder instance
     */
    mintingScript: (scriptCBOR: string, version?: LanguageVersion) => this;
    /**
     * Use reference script for minting
     * @param txHash The transaction hash of the UTxO
     * @param txIndex The transaction index of the UTxO
     * @returns The MeshTxBuilder instance
     */
    mintTxInReference: (txHash: string, txIndex: number, version?: LanguageVersion) => this;
    /**
     * Set the redeemer for minting
     * @param redeemer The redeemer in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param exUnits The execution units budget for the redeemer
     * @param type The redeemer data type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    mintReferenceTxInRedeemerValue: (redeemer: BuilderData['content'], exUnits?: {
        mem: number;
        steps: number;
    }, type?: BuilderData['type']) => this;
    /**
     * Set the redeemer for the reference input to be spent in same transaction
     * @param redeemer The redeemer in Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @param exUnits The execution units budget for the redeemer
     * @param type The redeemer data type, either Mesh Data type, JSON in raw constructor like format, or CBOR hex string
     * @returns The MeshTxBuilder instance
     */
    mintRedeemerValue: (redeemer: BuilderData['content'], exUnits?: {
        mem: number;
        steps: number;
    }, type?: BuilderData['type']) => this;
    /**
     * Set the required signer of the transaction
     * @param pubKeyHash The PubKeyHash of the required signer
     * @returns The MeshTxBuilder instance
     */
    requiredSignerHash: (pubKeyHash: string) => this;
    /**
     * Set the collateral UTxO for the transaction
     * @param txHash The transaction hash of the collateral UTxO
     * @param txIndex The transaction index of the collateral UTxO
     * @param amount The asset amount of index of the collateral UTxO
     * @param address The address of the collateral UTxO
     * @returns The MeshTxBuilder instance
     */
    txInCollateral: (txHash: string, txIndex: number, amount?: Asset[], address?: string) => this;
    /**
     * Configure the address to accept change UTxO
     * @param addr The address to accept change UTxO
     * @returns The MeshTxBuilder instance
     */
    changeAddress: (addr: string) => this;
    /**
     * Set the transaction valid interval to be valid only after the slot
     * @param slot The transaction is valid only after this slot
     * @returns The MeshTxBuilder instance
     */
    invalidBefore: (slot: number) => this;
    /**
     * Set the transaction valid interval to be valid only before the slot
     * @param slot The transaction is valid only before this slot
     * @returns The MeshTxBuilder instance
     */
    invalidHereafter: (slot: number) => this;
    /**
     * Add metadata to the transaction
     * @param tag The tag of the metadata
     * @param metadata The metadata in object format
     * @returns The MeshTxBuilder instance
     */
    metadataValue: <T extends object>(tag: string, metadata: T) => this;
    /**
     * Set the protocol parameters to be used for the transaction other than the default one
     * @param params (Part of) the protocol parameters to be used for the transaction
     * @returns The MeshTxBuilder instance
     */
    protocolParams: (params: Partial<Protocol>) => this;
    /**
     * Sign the transaction with the private key
     * @param skeyHex The private key in cborHex (with or without 5820 prefix, i.e. the format when generated from cardano-cli)
     * @returns
     */
    signingKey: (skeyHex: string) => this;
    /**
     * EXPERIMENTAL - Selects utxos to fill output value and puts them into inputs
     * @param extraInputs The inputs already placed into the object will remain, these extra inputs will be used to fill the remaining  value needed
     * @param threshold Extra value needed to be selected for, usually for paying fees and min UTxO value of change output
     */
    selectUtxosFrom: (extraInputs: UTxO[], threshold?: number) => this;
    private addUtxosFrom;
    private addAllSigningKeys;
    private buildTx;
    private queueInput;
    private queueMint;
    private makePlutusScriptSource;
    private addAllInputs;
    private addTxIn;
    private addScriptTxIn;
    private addAllOutputs;
    private addOutput;
    private addAllCollaterals;
    private addCollateral;
    private addCollateralReturn;
    private addAllReferenceInputs;
    private addReferenceInput;
    protected addAllMints: (mints: MintItem[]) => void;
    private addPlutusMint;
    private addNativeMint;
    protected queueAllLastItem: () => void;
    protected addCostModels: () => void;
    private addChange;
    private addValidityRange;
    private addAllRequiredSignatures;
    private addAllMetadata;
    protected updateRedeemer: (meshTxBuilderBody: MeshTxBuilderBody, txEvaluation: Omit<Action, 'data'>[]) => void;
    protected castRawDataToJsonString: (rawData: object | string) => string;
    protected castDataToPlutusData: ({ type, content }: BuilderData) => csl.PlutusData;
}
