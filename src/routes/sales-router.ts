import {Router} from "express";
import {salesController} from "@controllers/SalesController";

const salesRouter = Router();

salesRouter.post("/api/sales/send", salesController.sendMessageStock);

export { salesRouter };