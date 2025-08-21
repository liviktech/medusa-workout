"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductTypeRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminProductTypeRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/product-types",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTypesParams, QueryConfig.listProductTypesTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/product-types/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTypeParams, QueryConfig.retrieveProductTypeTransformQueryConfig),
        ],
    },
    // Create/update/delete methods are new in v2
    {
        method: ["POST"],
        matcher: "/admin/product-types",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateProductType),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTypeParams, QueryConfig.retrieveProductTypeTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/product-types/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateProductType),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTypeParams, QueryConfig.retrieveProductTypeTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/product-types/:id",
        middlewares: [],
    },
];
