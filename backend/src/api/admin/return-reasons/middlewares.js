"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminReturnReasonRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminReturnReasonRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/return-reasons",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReturnReasonsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/return-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReturnReasonsReturnReasonParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/return-reasons",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateReturnReason),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReturnReasonsReturnReasonParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/return-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateReturnReason),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReturnReasonsReturnReasonParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/return-reasons/:id",
    },
];
