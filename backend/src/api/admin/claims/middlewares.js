"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminClaimRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminClaimRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/claims",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/claims/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostOrderClaimsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/claim-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/claim-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/claim-items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/inbound/items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsRequestReturnItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/inbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/inbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/inbound/shipping-method",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsShippingReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/inbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsShippingActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/inbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/outbound/items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsAddItemsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/outbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsRequestItemsActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/outbound/items/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/outbound/shipping-method",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsShippingReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/outbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostClaimsShippingActionReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/outbound/shipping-method/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/request",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id/request",
        middlewares: [],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/claims/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/claims/:id/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminPostCancelClaimReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
