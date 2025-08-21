"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOrderRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminOrderRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/orders",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/orders/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateOrder),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/orders/:id/line-items",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderItemsParams, QueryConfig.listOrderItemsQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/orders/:id/changes",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminOrderChangesParams, QueryConfig.retrieveOrderChangesTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/orders/:id/preview",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/archive",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/cancel",
        middlewares: [
            // validateAndTransformBody(),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/complete",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCompleteOrder),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/credit-lines",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateOrderCreditLines),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/fulfillments",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminOrderCreateFulfillment),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/fulfillments/:fulfillment_id/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminOrderCancelFulfillment),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/fulfillments/:fulfillment_id/shipments",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminOrderCreateShipment),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/fulfillments/:fulfillment_id/mark-as-delivered",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminMarkOrderFulfillmentDelivered),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/transfer",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminTransferOrder),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/orders/:id/transfer/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCancelOrderTransferRequest),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetOrdersOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
