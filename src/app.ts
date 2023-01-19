import "reflect-metadata"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { CategoryRouter } from "./routes/category.routes";
import { CustomerRouter } from "./routes/customer.routes";
import { InvoiceDetailRouter } from "./routes/inv-detail.routes";
import { InvoiceRouter } from "./routes/invoice.routes";
import { ProductRouter } from "./routes/product.routes";
import { UserRouter } from "./routes/user.routes";
import { ConfigServer } from "./config/config";
import { DataSource } from "typeorm";
import { LoginStrategy } from "./strategies/login.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

class Server extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT");
    constructor() {
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.passportUse();
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
    passportUse() {
        return [new LoginStrategy().use, new JwtStrategy().use];
    }
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