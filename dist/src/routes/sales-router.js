"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRouter = void 0;
const express_1 = require("express");
const SalesController_1 = require("../controllers/SalesController");
const salesRouter = (0, express_1.Router)();
exports.salesRouter = salesRouter;
salesRouter.post("/api/sales/send", SalesController_1.salesController.sendMessageStock);
