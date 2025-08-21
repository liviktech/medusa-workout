"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminWorkflowsExecutionsMiddlewares = void 0;
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var framework_1 = require("@medusajs/framework");
var framework_2 = require("@medusajs/framework");
exports.adminWorkflowsExecutionsMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/workflows-executions",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetWorkflowExecutionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/workflows-executions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetWorkflowExecutionDetailsParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/workflows-executions/:workflow_id/:transaction_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetWorkflowExecutionDetailsParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/workflows-executions/:workflow_id/run",
        middlewares: [(0, framework_2.validateAndTransformBody)(validators_1.AdminCreateWorkflowsRun)],
    },
    {
        method: ["POST"],
        matcher: "/admin/workflows-executions/:workflow_id/steps/success",
        middlewares: [(0, framework_2.validateAndTransformBody)(validators_1.AdminCreateWorkflowsAsyncResponse)],
    },
    {
        method: ["POST"],
        matcher: "/admin/workflows-executions/:workflow_id/steps/failure",
        middlewares: [(0, framework_2.validateAndTransformBody)(validators_1.AdminCreateWorkflowsAsyncResponse)],
    },
];
