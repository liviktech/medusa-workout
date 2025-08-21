"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminExchangeRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminExchangeRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/exchanges",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/exchanges/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostOrderExchangesReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/inbound/items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesReturnRequestItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/inbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesRequestItemsReturnActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id/inbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/inbound/shipping-method",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesShippingReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/inbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesShippingActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id/inbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/outbound/items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesAddItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/outbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id/outbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/outbound/shipping-method",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesShippingReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/outbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostExchangesShippingActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id/outbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/request",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id/request",
        middlewares: [],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/exchanges/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/exchanges/:id/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostCancelExchangeReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
