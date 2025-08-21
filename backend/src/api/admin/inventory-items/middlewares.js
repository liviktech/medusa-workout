"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminInventoryRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var middlewares_1 = require("../../../utils/middlewares");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminInventoryRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/inventory-items",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/inventory-items/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateInventoryItem),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminBatchInventoryItemLevels)],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/location-levels/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_1.AdminBatchInventoryItemLevels)],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateInventoryItem),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/inventory-items/:id/location-levels",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryLocationLevelsParams, QueryConfig.listLocationLevelsTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/:id/location-levels",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateInventoryLocationLevel),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/:id/location-levels/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminBatchInventoryItemLocationsLevel),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryLocationLevelParams, QueryConfig.retrieveLocationLevelsTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/inventory-items/:id/location-levels/:location_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/inventory-items/:id/location-levels/:location_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateInventoryLocationLevel),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInventoryItemParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
