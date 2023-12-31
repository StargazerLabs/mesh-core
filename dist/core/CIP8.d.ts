import type { DataSignature } from '@mesh/common/types';
import type { Address, PrivateKey } from '@mesh/core';
export declare const signMessage: (message: Message, signer: Signer) => {
    coseKey: string;
    coseSign1: string;
};
export declare const checkSignature: (message: string, signer: string, { key, signature }: DataSignature) => boolean;
export type Message = {
    payload: string;
    externalAAD?: string;
};
export type Signer = {
    address: Address;
    key: PrivateKey;
};
