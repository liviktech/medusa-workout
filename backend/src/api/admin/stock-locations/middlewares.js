"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStockLocationRoutesMiddlewares = void 0;
var http_1 = require("@medusajs/framework/http");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminStockLocationRoutesMiddlewares = [
    {
        method: ["POST"],
        matcher: "/admin/stock-locations",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateStockLocation),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/stock-locations",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationsParams, QueryConfig.listTransformQueryConfig),
            (0, http_1.maybeApplyLinkFilter)({
                entryPoint: "sales_channel_location",
                resourceId: "stock_location_id",
                filterableField: "sales_channel_id",
            }),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/stock-locations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateStockLocation),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/stock-locations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/stock-locations/:id/fulfillment-sets",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateStockLocationFulfillmentSet),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/stock-locations/:id/sales-channels",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/stock-locations/:id/fulfillment-providers",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetStockLocationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
