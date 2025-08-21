"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProductTagRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeProductTagRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/product-tags",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductTagsParams, QueryConfig.listProductTagConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/product-tags/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductTagParams, QueryConfig.retrieveProductTagConfig),
        ],
    },
];
