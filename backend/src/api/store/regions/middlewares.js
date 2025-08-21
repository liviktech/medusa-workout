"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRegionRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeRegionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/regions",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetRegionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/regions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetRegionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
