import { BaseRouter } from "../shared/router";
import { InvoiceDetailController } from "../controllers/inv-detail.ctrl";
export class InvoiceDetailRouter extends BaseRouter<InvoiceDetailController> {
    constructor() {
        super(InvoiceDetailController);
    };
    routes(): void {
        this.router.get("/invoiceDetails", (req, res) => this.controller.getInvoiceDetails(req, res));
        this.router.get("/invoiceDetail/:id", (req, res) => this.controller.getInvoiceDetailById(req, res));
        this.router.post("/createInvoiceDetail", (req, res) => this.controller.createInvoiceDetail(req, res));
        this.router.delete("/deleteInvoiceDetail/:id", (req, res) => this.controller.deleteInvoiceDetail(req, res));
        this.router.put("/updateInvoiceDetail/:id", (req, res) => this.controller.updateInvoiceDetail(req, res));
    };
};
