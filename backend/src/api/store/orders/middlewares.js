"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeOrderRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var http_1 = require("@medusajs/framework/http");
var authenticate_middleware_1 = require("../../../utils/middlewares/authenticate-middleware");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeOrderRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/orders",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("customer", ["session", "bearer"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/orders/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/orders/:id/transfer/request",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("customer", ["session", "bearer"]),
            (0, http_1.validateAndTransformBody)(validators_1.StoreRequestOrderTransfer),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/orders/:id/transfer/cancel",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("customer", ["session", "bearer"]),
            (0, http_1.validateAndTransformBody)(validators_1.StoreCancelOrderTransferRequest),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/orders/:id/transfer/accept",
        middlewares: [
            (0, http_1.validateAndTransformBody)(validators_1.StoreAcceptOrderTransfer),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/orders/:id/transfer/decline",
        middlewares: [
            (0, http_1.validateAndTransformBody)(validators_1.StoreDeclineOrderTransferRequest),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
