"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTaxProviderRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminTaxProviderRoutesMiddlewares = [
    {
        method: "GET",
        matcher: "/admin/tax-providers",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxProvidersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
];
