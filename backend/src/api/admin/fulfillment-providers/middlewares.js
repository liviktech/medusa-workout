"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminFulfillmentProvidersRoutesMiddlewares = void 0;
var http_1 = require("@medusajs/framework/http");
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminFulfillmentProvidersRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/fulfillment-providers",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminFulfillmentProvidersParams, QueryConfig.listTransformQueryConfig),
            (0, http_1.maybeApplyLinkFilter)({
                entryPoint: "location_fulfillment_provider",
                resourceId: "fulfillment_provider_id",
                filterableField: "stock_location_id",
            }),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/fulfillment-providers/:id/options",
        middlewares: [],
    },
];
