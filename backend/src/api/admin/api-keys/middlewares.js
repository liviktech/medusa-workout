"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiKeyRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
var validators_2 = require("../../utils/validators");
exports.adminApiKeyRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/api-keys",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeysParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/api-keys/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/api-keys",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateApiKey),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/api-keys/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateApiKey),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/api-keys/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/api-keys/:id/revoke",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminRevokeApiKey),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/api-keys/:id/sales-channels",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_2.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetApiKeyParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
