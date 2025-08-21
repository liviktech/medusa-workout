"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storePaymentCollectionsMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var queryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storePaymentCollectionsMiddlewares = [
    {
        method: ["POST"],
        matcher: "/store/payment-collections",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreatePaymentCollection),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetPaymentCollectionParams, queryConfig.retrievePaymentCollectionTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/payment-collections/:id/payment-sessions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreatePaymentSession),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetPaymentCollectionParams, queryConfig.retrievePaymentCollectionTransformQueryConfig),
        ],
    },
];
