"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminReturnRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminReturnRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/returns",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/returns/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsReturnReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/request-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsRequestItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/request-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/request-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/shipping-method",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsShippingReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsShippingActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/request",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsConfirmRequestReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostCancelReturnReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/request",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/receive",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReceiveReturnsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/receive",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/receive/confirm",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsConfirmRequestReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/receive-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReceiveReturnItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/receive-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/receive-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/dismiss-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReceiveReturnItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/returns/:id/dismiss-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostReturnsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/returns/:id/dismiss-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
