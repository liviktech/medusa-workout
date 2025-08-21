"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminShippingOptionTypeRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminShippingOptionTypeRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/shipping-option-types",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetShippingOptionTypesParams, QueryConfig.listShippingOptionTypesTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/shipping-option-types/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetShippingOptionTypeParams, QueryConfig.retrieveShippingOptionTypeTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/shipping-option-types",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateShippingOptionType),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetShippingOptionTypeParams, QueryConfig.retrieveShippingOptionTypeTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/shipping-option-types/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateShippingOptionType),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetShippingOptionTypeParams, QueryConfig.retrieveShippingOptionTypeTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/shipping-option-types/:id",
        middlewares: [],
    },
];
