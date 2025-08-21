"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductCategoryRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminProductCategoryRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/product-categories",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminProductCategoriesParams, QueryConfig.listProductCategoryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/product-categories/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminProductCategoryParams, QueryConfig.retrieveProductCategoryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/product-categories",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateProductCategory),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminProductCategoryParams, QueryConfig.retrieveProductCategoryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/product-categories/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateProductCategory),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminProductCategoryParams, QueryConfig.retrieveProductCategoryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/product-categories/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/product-categories/:id/products",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminProductCategoryParams, QueryConfig.retrieveProductCategoryConfig),
        ],
    },
];
