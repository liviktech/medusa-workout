"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFulfillmentSetsRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminFulfillmentSetsRoutesMiddlewares = [
    {
        method: ["POST"],
        matcher: "/admin/fulfillment-sets/:id/service-zones",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateFulfillmentSetServiceZonesSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentSetParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/fulfillment-sets/:id/service-zones/:zone_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentSetParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/fulfillment-sets/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/fulfillment-sets/:id/service-zones/:zone_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateFulfillmentSetServiceZonesSchema),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentSetParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/fulfillment-sets/:id/service-zones/:zone_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminServiceZonesParams, QueryConfig.retrieveServiceZoneTransformQueryConfig),
        ],
    },
];
