export declare const deriveAccountKeys: (rootKey: string, accountIndex: number) => {
    paymentKey: import("@emurgo/cardano-serialization-lib-asmjs").PrivateKey;
    stakeKey: import("@emurgo/cardano-serialization-lib-asmjs").PrivateKey;
};
