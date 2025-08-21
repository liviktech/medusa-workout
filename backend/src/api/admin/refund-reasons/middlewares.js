"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRefundReasonsRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var queryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminRefundReasonsRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/refund-reasons",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRefundReasonsParams, queryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/refund-reasons",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreatePaymentRefundReason),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRefundReasonsParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/refund-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdatePaymentRefundReason),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRefundReasonsParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/refund-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRefundReasonsParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/refund-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRefundReasonsParams, queryConfig.retrieveTransformQueryConfig),
        ],
    },
];
