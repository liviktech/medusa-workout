"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminNotificationRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminNotificationRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/notifications",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetNotificationsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/notifications/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetNotificationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
