"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminSalesChannelRoutesMiddlewares = void 0;
var http_1 = require("@medusajs/framework/http");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminSalesChannelRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/sales-channels",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetSalesChannelsParams, QueryConfig.listTransformQueryConfig),
            (0, http_1.maybeApplyLinkFilter)({
                entryPoint: "sales_channel_location",
                resourceId: "sales_channel_id",
                filterableField: "location_id",
            }),
            (0, http_1.maybeApplyLinkFilter)({
                entryPoint: "publishable_api_key_sales_channel",
                resourceId: "sales_channel_id",
                filterableField: "publishable_key_id",
            }),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/sales-channels/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetSalesChannelParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/sales-channels",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateSalesChannel),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetSalesChannelParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/sales-channels/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateSalesChannel),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetSalesChannelParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/sales-channels/:id",
        middlewares: [],
    },
    {
        method: ["POST"],
        matcher: "/admin/sales-channels/:id/products",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetSalesChannelParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
