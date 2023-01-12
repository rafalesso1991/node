import express from "express";
import morgan from "morgan";
import cors from "cors";
import { CategoryRouter } from "./routers/category.router";
import { CustomerRouter } from "./routers/customer.router";
import { InvoiceDetailRouter } from "./routers/inv-detail.router";
import { InvoiceRouter } from "./routers/invoice.router";
import { ProductRouter } from "./routers/product.router";
import { UserRouter } from "./routers/user.router";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT");
    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.dbConnect();
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use("/api", this.routers());
        this.listen();
    };
    routers(): Array<express.Router> {
        return [
            new CategoryRouter().router,
            new CustomerRouter().router,
            new InvoiceDetailRouter().router,
            new InvoiceRouter().router,
            new ProductRouter().router,
            new UserRouter().router
        ]
    };
    async dbConnect(): Promise<DataSource | void> {
        return this.initConnect
            .then(() => {
                console.log("Conexion Exitosa");
            })
            .catch((err) => {
                console.error(err);
            });
    };
    public listen() {
        this.app.listen(this.port, () =>{
            console.log("Server listening on port " + this.port);
        });
    };
};

new Server();