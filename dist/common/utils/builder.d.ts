import { csl } from '@mesh/core';
import type { BaseAddress, Bip32PrivateKey, DataCost, DatumSource, Ed25519KeyHash, EnterpriseAddress, MintWitness, PlutusScriptSource, RewardAddress, TransactionBuilder, TransactionOutputBuilder, TxInputsBuilder } from '@mesh/core';
import type { Action, Data, PlutusScript, Recipient, UTxO } from '@mesh/common/types';
export declare const buildBaseAddress: (networkId: number, paymentKeyHash: Ed25519KeyHash, stakeKeyHash: Ed25519KeyHash) => BaseAddress;
export declare const buildBip32PrivateKey: (entropy: string, password?: string) => Bip32PrivateKey;
export declare const buildDataCost: (coinsPerByte: string) => DataCost;
export declare const buildDatumSource: (datum: Data | UTxO) => DatumSource;
export declare const buildEnterpriseAddress: (networkId: number, paymentKeyHash: Ed25519KeyHash) => EnterpriseAddress;
export declare const buildGeneralTxMetadata: (metadata: Record<string, unknown>) => csl.GeneralTransactionMetadata;
export declare const buildMintWitness: (script: string | PlutusScript | UTxO, redeemer?: Partial<Action>) => MintWitness;
export declare const buildRewardAddress: (networkId: number, stakeKeyHash: Ed25519KeyHash) => RewardAddress;
export declare const buildPlutusScriptSource: (script: PlutusScript | UTxO) => PlutusScriptSource;
export declare const buildScriptPubkey: (keyHash: Ed25519KeyHash) => csl.NativeScript;
export declare const buildTimelockExpiry: (slot: string) => csl.NativeScript;
export declare const buildTimelockStart: (slot: string) => csl.NativeScript;
export declare const buildTxBuilder: (parameters?: import("@mesh/common/types").Protocol) => TransactionBuilder;
export declare const buildTxInputsBuilder: (utxos: unknown[]) => TxInputsBuilder;
export declare const buildTxOutputBuilder: (recipient: Recipient) => TransactionOutputBuilder;
