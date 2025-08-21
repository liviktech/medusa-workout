"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRegionRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminRegionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/regions",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRegionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/regions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRegionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/regions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateRegion),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRegionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/regions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateRegion),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetRegionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
