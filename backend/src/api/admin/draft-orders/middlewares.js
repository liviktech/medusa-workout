"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDraftOrderRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminDraftOrderRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/draft-orders",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetDraftOrdersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/draft-orders/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetDraftOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateDraftOrder),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetDraftOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateDraftOrder),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetDraftOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/convert-to-order",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetDraftOrderParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/items",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminAddDraftOrderItems)],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/items/item/:item_id",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateDraftOrderItem)],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/items/:action_id",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateDraftOrderActionItem)],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/promotions",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminAddDraftOrderPromotions)],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/draft-orders/:id/edit/promotions",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminRemoveDraftOrderPromotions)],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/shipping-methods",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminAddDraftOrderShippingMethod)],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/shipping-methods/method/:method_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateDraftOrderShippingMethod),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/draft-orders/:id/edit/shipping-methods/:action_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateDraftOrderActionShippingMethod),
        ],
    },
];
