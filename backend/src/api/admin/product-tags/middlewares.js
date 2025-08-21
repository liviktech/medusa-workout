"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductTagRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminProductTagRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/product-tags",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTagsParams, QueryConfig.listProductTagsTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/product-tags/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTagParams, QueryConfig.retrieveProductTagTransformQueryConfig),
        ],
    },
    // Create/update/delete methods are new in v2
    {
        method: ["POST"],
        matcher: "/admin/product-tags",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateProductTag),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTagParams, QueryConfig.retrieveProductTagTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/product-tags/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateProductTag),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductTagParams, QueryConfig.retrieveProductTagTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/product-tags/:id",
        middlewares: [],
    },
];
