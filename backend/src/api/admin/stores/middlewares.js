"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStoreRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminStoreRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/stores",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetStoresParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/stores/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetStoreParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/stores/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateStore),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetStoreParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
