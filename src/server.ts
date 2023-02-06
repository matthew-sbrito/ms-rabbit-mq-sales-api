import "express-async-errors";
import "dotenv/config";

import express from 'express';
import cors from 'cors';

import {httpErrorHandling} from "@libs/error/http-error-handling";
import {ensureAuthenticated} from "@plugins/ensure-authenticated";
import {connectRabbitMQ} from "@rabbitmq/connect";
import {salesRouter} from "@routes/sales-router";
import {tracingLog} from "@plugins/tracing-log";
import {Logger} from "@helpers/log/Logger";

const logger = Logger.createLogger("server.ts");

const app = express();
const env = process.env;
const PORT = env.PORT ?? 8082;

connectRabbitMQ()
    .then(() => logger.info("Connect RabbitMQ successfully!"))
    .catch(() => logger.info("Connect RabbitMQ failed!"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(tracingLog)

app.get("/api/status", (request, response) => {
    return response.status(200).json( {service: 'Sales API', status: "UP" });
})
app.use(ensureAuthenticated);

app.use(salesRouter);

app.use(httpErrorHandling);

app.listen(PORT,() => logger.info(`Server is running in port ${PORT}`));