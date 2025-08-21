"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTaxRegionRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var framework_1 = require("@medusajs/framework");
exports.adminTaxRegionRoutesMiddlewares = [
    {
        method: "POST",
        matcher: "/admin/tax-regions",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateTaxRegion),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRegionsParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "POST",
        matcher: "/admin/tax-regions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateTaxRegion),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRegionsParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "GET",
        matcher: "/admin/tax-regions",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRegionsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: "GET",
        matcher: "/admin/tax-regions/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRegionParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
