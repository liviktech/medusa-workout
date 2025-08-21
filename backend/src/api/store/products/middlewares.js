"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeProductRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var http_1 = require("@medusajs/framework/http");
var utils_1 = require("@medusajs/framework/utils");
var index_engine_1 = require("../../../loaders/feature-flags/index-engine");
var middlewares_1 = require("../../utils/middlewares");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
exports.storeProductRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/store/products",
        middlewares: [
            (0, http_1.authenticate)("customer", ["session", "bearer"], {
                allowUnauthenticated: true,
            }),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetProductsParams, QueryConfig.listProductQueryConfig),
            (0, middlewares_1.filterByValidSalesChannels)(),
            function (req, res, next) {
                var canUseIndex = !((0, utils_1.isPresent)(req.filterableFields.tags) ||
                    (0, utils_1.isPresent)(req.filterableFields.categories));
                if (framework_1.featureFlagRouter.isFeatureEnabled(index_engine_1.default.key) &&
                    canUseIndex) {
                    return next();
                }
                return (0, http_1.maybeApplyLinkFilter)({
                    entryPoint: "product_sales_channel",
                    resourceId: "product_id",
                    filterableField: "sales_channel_id",
                })(req, res, next);
            },
            (0, http_1.applyDefaultFilters)({
                status: utils_1.ProductStatus.PUBLISHED,
                // TODO: the type here seems off and the implementation does not take into account $and and $or possible filters. Might be worth re working (original type used here was StoreGetProductsParamsType)
                categories: function (filters, fields) {
                    var categoryIds = filters.category_id;
                    delete filters.category_id;
                    if (!(0, utils_1.isPresent)(categoryIds)) {
                        return;
                    }
                    return { id: categoryIds, is_internal: false, is_active: true };
                },
            }),
            (0, middlewares_1.normalizeDataForContext)(),
            (0, middlewares_1.setPricingContext)(),
            (0, middlewares_1.setTaxContext)(),
            (0, http_1.clearFiltersByKey)(["region_id", "country_code", "province", "cart_id"]),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/products/:id",
        middlewares: [
            (0, http_1.authenticate)("customer", ["session", "bearer"], {
                allowUnauthenticated: true,
            }),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetProductsParams, QueryConfig.retrieveProductQueryConfig),
            (0, http_1.applyParamsAsFilters)({ id: "id" }),
            (0, middlewares_1.filterByValidSalesChannels)(),
            (0, http_1.maybeApplyLinkFilter)({
                entryPoint: "product_sales_channel",
                resourceId: "product_id",
                filterableField: "sales_channel_id",
            }),
            (0, http_1.applyDefaultFilters)({
                status: utils_1.ProductStatus.PUBLISHED,
                categories: function (_filters, fields) {
                    if (!fields.some(function (field) { return field.startsWith("categories"); })) {
                        return;
                    }
                    return { is_internal: false, is_active: true };
                },
            }),
            (0, middlewares_1.normalizeDataForContext)(),
            (0, middlewares_1.setPricingContext)(),
            (0, middlewares_1.setTaxContext)(),
            (0, http_1.clearFiltersByKey)(["region_id", "country_code", "province", "cart_id"]),
        ],
    },
];
