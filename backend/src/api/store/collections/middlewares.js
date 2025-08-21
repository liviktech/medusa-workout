"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCollectionRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.storeCollectionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/collections",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCollectionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/collections/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCollectionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
