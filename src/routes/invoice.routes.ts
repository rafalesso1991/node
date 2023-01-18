import { BaseRouter } from "../shared/router";
import { InvoiceController } from "../controllers/invoice.ctrl";
export class InvoiceRouter extends BaseRouter<InvoiceController> {
    constructor() {
        super(InvoiceController);
    };
    routes(): void {
        this.router.get("/invoices", (req, res) => this.controller.getInvoices(req, res));
        this.router.get("/invoice/:id", (req, res) => this.controller.getInvoiceById(req, res));
        this.router.post("/createInvoice", (req, res) => this.controller.createInvoice(req, res));
        this.router.delete("/deleteInvoice/:id", (req, res) => this.controller.deleteInvoice(req, res));
        this.router.put("/updateInvoice/:id", (req, res) => this.controller.updateInvoice(req, res));
    };
};
