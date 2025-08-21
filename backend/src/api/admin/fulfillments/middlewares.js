"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFulfillmentsRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminFulfillmentsRoutesMiddlewares = [
    {
        method: ["POST"],
        matcher: "/admin/fulfillments/:id/cancel",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/fulfillments",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateFulfillment),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/fulfillments/:id/shipment",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateShipment),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
