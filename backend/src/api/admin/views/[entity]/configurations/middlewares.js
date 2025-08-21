"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewConfigurationRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var middleware_1 = require("./middleware");
exports.viewConfigurationRoutesMiddlewares = [
    // Apply feature flag check to all view configuration routes
    {
        method: ["GET", "POST", "DELETE"],
        matcher: "/admin/views/*/configurations*",
        middlewares: [middleware_1.ensureViewConfigurationsEnabled],
    },
    {
        method: ["GET"],
        matcher: "/admin/views/:entity/configurations",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetViewConfigurationsParams, QueryConfig.retrieveViewConfigurationList),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/views/:entity/configurations",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateViewConfiguration),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/views/:entity/configurations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetViewConfigurationParams, QueryConfig.retrieveViewConfiguration),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/views/:entity/configurations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateViewConfiguration),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/views/:entity/configurations/active",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetActiveViewConfigurationParams, QueryConfig.retrieveViewConfiguration),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/views/:entity/configurations/active",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminSetActiveViewConfiguration),
        ],
    },
];
