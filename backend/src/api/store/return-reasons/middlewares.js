"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeReturnReasonRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeReturnReasonRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/return-reasons",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreReturnReasonParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/return-reasons/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreReturnReasonParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
