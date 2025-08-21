"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeReturnsRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeReturnsRoutesMiddlewares = [
    {
        method: ["POST"],
        matcher: "/store/returns",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StorePostReturnsReqSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.ReturnsParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
