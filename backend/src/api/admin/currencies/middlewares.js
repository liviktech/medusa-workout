"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCurrencyRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminCurrencyRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/currencies",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCurrenciesParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/currencies/:code",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCurrencyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
