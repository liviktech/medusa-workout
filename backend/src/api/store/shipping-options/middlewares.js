"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeShippingOptionRoutesMiddlewares = void 0;
var http_1 = require("@medusajs/framework/http");
var framework_1 = require("@medusajs/framework");
var query_config_1 = require("./query-config");
var validators_1 = require("./validators");
var QueryConfig = require("./query-config");
exports.storeShippingOptionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/shipping-options",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetShippingOptions, query_config_1.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/shipping-options/:id/calculate",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetShippingOptionsParams, QueryConfig.retrieveTransformQueryConfig),
            (0, http_1.validateAndTransformBody)(validators_1.StoreCalculateShippingOptionPrice),
        ],
    },
];
