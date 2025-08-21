"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCurrencyRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeCurrencyRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/currencies",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCurrenciesParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/currencies/:code",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCurrencyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
