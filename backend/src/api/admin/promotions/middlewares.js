"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPromotionRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var middlewares_1 = require("../../../utils/middlewares");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminPromotionRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/promotions",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/promotions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreatePromotion),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/promotions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/promotions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdatePromotion),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/promotions/:id/:rule_type",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionRuleTypeParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/promotions/:id/rules/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.AdminCreatePromotionRule, validators_2.AdminUpdatePromotionRule)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionRuleParams, QueryConfig.retrieveRuleTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/promotions/:id/target-rules/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.AdminCreatePromotionRule, validators_2.AdminUpdatePromotionRule)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionRuleParams, QueryConfig.retrieveRuleTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/promotions/:id/buy-rules/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.AdminCreatePromotionRule, validators_2.AdminUpdatePromotionRule)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionRuleParams, QueryConfig.retrieveRuleTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/promotions/rule-value-options/:rule_type/:rule_attribute_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionsRuleValueParams, QueryConfig.listRuleValueTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/promotions/rule-attribute-options/:rule_type",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPromotionRuleParams, QueryConfig.listRuleTransformQueryConfig),
        ],
    },
];
