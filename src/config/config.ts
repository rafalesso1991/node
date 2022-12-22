import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
    constructor() {
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path: nodeNameEnv,
        });
    };
    // Environment Key => process.env['PORT']
    public getEnvironment(k: string): string | undefined {
        return process.env[k];
    };
    // Gets 'string' => returns 'number'
    public getNumberEnv(k: string): number {
        return Number(this.getEnvironment(k));
    };
    // GETTER ("SETTER") => "scripts":"prod", package.json
    public get nodeEnv(): string {
        return this.getEnvironment("NODE_ENV")?.trim() || "";
    };
    // Path
    public createPathEnv(path: string): string {
        const arrEnv: Array<string> = ["env"];
        if (path.length > 0) {
            const stringToArray = path.split(".");
            arrEnv.unshift(...stringToArray);
        };
        return "." + arrEnv.join("."); // ['prod', 'env'] => 'prod.env'
    };
    // Connection Database
    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    };
};