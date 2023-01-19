import { BaseRouter } from "../shared/router";
import { InvoiceDetailController } from "../controllers/inv-detail.ctrl";
import { InvoiceDetailMiddleware } from "../middlewares/inv-detail.mw";
export class InvoiceDetailRouter extends BaseRouter<InvoiceDetailController, InvoiceDetailMiddleware> {
  constructor() {
    super(InvoiceDetailController, InvoiceDetailMiddleware);
    };
    routes(): void {
        this.router.get("/invoiceDetails", (req, res) => this.controller.getInvoiceDetails(req, res));
        this.router.get("/invoiceDetail/:id", (req, res) => this.controller.getInvoiceDetailById(req, res));
        this.router.post(
            "/createInvoiceDetail",
            (req, res, next) => [this.middleware.invoiceValidator(req, res, next)],
            (req, res) => this.controller.createInvoiceDetail(req, res)
        );        this.router.delete("/deleteInvoiceDetail/:id", (req, res) => this.controller.deleteInvoiceDetail(req, res));
        this.router.put("/updateInvoiceDetail/:id", (req, res) => this.controller.updateInvoiceDetail(req, res));
    };
};
