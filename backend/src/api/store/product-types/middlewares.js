"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProductTypeRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeProductTypeRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/product-types",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductTypesParams, QueryConfig.listProductTypeConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/product-types/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductTypesParams, QueryConfig.retrieveProductTypeConfig),
        ],
    },
];
