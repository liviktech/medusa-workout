"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPaymentCollectionsMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var queryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminPaymentCollectionsMiddlewares = [
    {
        method: ["POST"],
        matcher: "/admin/payment-collections",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreatePaymentCollection),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentCollectionParams, queryConfig.retrievePaymentCollectionTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/payment-collections/:id/mark-as-paid",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminMarkPaymentCollectionPaid),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentCollectionParams, queryConfig.retrievePaymentCollectionTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/payment-collections/:id",
        middlewares: [],
    },
];
