"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProductCategoryRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var helpers_1 = require("./helpers");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeProductCategoryRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/product-categories",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductCategoriesParams, QueryConfig.listProductCategoryConfig),
            helpers_1.applyCategoryFilters,
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/product-categories/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreProductCategoryParams, QueryConfig.retrieveProductCategoryConfig),
            helpers_1.applyCategoryFilters,
        ],
    },
];
