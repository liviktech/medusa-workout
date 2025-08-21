"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCartRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var http_1 = require("@medusajs/framework/http");
var ensure_pub_key_sales_channel_match_1 = require("../../utils/middlewares/common/ensure-pub-key-sales-channel-match");
var maybe_attach_pub_key_scopes_1 = require("../../utils/middlewares/common/maybe-attach-pub-key-scopes");
var OrderQueryConfig = require("../orders/query-config");
var validators_1 = require("../orders/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.storeCartRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/carts/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreCreateCart),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
            maybe_attach_pub_key_scopes_1.maybeAttachPublishableKeyScopes,
            ensure_pub_key_sales_channel_match_1.ensurePublishableKeyAndSalesChannelMatch,
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreUpdateCart),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/customer",
        middlewares: [
            (0, http_1.authenticate)("customer", ["session", "bearer"]),
            (0, framework_1.validateAndTransformBody)(validators_2.StoreUpdateCartCustomer),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/line-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreAddCartLineItem),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/line-items/:line_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreUpdateCartLineItem),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/store/carts/:id/line-items/:line_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/promotions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreAddCartPromotions),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/taxes",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreCalculateCartTaxes),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/shipping-methods",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreAddCartShippingMethods),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/store/carts/:id/promotions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.StoreRemoveCartPromotions),
            (0, framework_1.validateAndTransformQuery)(validators_2.StoreGetCartsCart, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/carts/:id/complete",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetOrderParams, OrderQueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
