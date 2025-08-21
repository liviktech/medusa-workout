"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCampaignRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminCampaignRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/campaigns",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCampaignsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/campaigns",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateCampaign),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCampaignParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/campaigns/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCampaignParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/campaigns/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateCampaign),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCampaignParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/campaigns/:id/promotions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCampaignParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
