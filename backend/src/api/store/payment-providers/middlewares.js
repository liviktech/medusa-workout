"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storePaymentProvidersMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var queryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storePaymentProvidersMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/payment-providers",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetPaymentProvidersParams, queryConfig.listTransformPaymentProvidersQueryConfig),
        ],
    },
];
