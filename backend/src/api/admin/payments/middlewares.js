"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPaymentRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var queryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminPaymentRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/payments",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentsParams, queryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/payments/payment-providers",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentProvidersParams, queryConfig.listTransformPaymentProvidersQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/payments/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/payments/:id/capture",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreatePaymentCapture),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/payments/:id/refund",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreatePaymentRefund),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPaymentParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
];
