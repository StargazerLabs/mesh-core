import { IUploader } from '@mesh/common/contracts';
export declare class InfuraProvider implements IUploader {
    private _axiosInstance;
    constructor(projectId: string, projectSecret: string, options: Partial<CreateInfuraProviderOptions>);
    uploadContent(content: FormData, recursive?: boolean): Promise<string>;
}
type CreateInfuraProviderOptions = {
    host: string;
    port: number;
    version: number;
};
export {};
