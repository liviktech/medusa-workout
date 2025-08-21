"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPricePreferencesRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.adminPricePreferencesRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/price-preferences",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPricePreferencesParams, QueryConfig.listPricePreferenceQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/price-preferences/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPricePreferenceParams, QueryConfig.retrivePricePreferenceQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-preferences",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreatePricePreference),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPricePreferenceParams, QueryConfig.retrivePricePreferenceQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-preferences/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdatePricePreference),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetPricePreferenceParams, QueryConfig.retrivePricePreferenceQueryConfig),
        ],
    },
];
