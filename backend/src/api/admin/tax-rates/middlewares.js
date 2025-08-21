"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminTaxRateRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminTaxRateRoutesMiddlewares = [
    {
        method: "POST",
        matcher: "/admin/tax-rates",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateTaxRate),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRateParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "POST",
        matcher: "/admin/tax-rates/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateTaxRate),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRateParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "GET",
        matcher: "/admin/tax-rates/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRateParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "GET",
        matcher: "/admin/tax-rates",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRatesParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: "POST",
        matcher: "/admin/tax-rates/:id/rules",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateTaxRateRule),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRateParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "DELETE",
        matcher: "/admin/tax-rates/:id/rules/:rule_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetTaxRateParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
