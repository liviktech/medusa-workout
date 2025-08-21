"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductVariantRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminProductVariantRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/product-variants",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetProductVariantsParams, QueryConfig.listProductVariantQueryConfig),
        ],
    },
];
