"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCollectionRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
var validators_2 = require("../../utils/validators");
exports.adminCollectionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/collections",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCollectionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/collections/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCollectionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/collections",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateCollection),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCollectionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/collections/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateCollection),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCollectionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/collections/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/collections/:id/products",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_2.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetCollectionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
