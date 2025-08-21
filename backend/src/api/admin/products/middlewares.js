"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var multer_1 = require("multer");
var http_1 = require("@medusajs/framework/http");
var middlewares_1 = require("../../../utils/middlewares");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var utils_1 = require("./utils");
var validators_2 = require("./validators");
var index_engine_1 = require("../../../loaders/feature-flags/index-engine");
var upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
exports.adminProductRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/products",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductsParams, QueryConfig.listProductQueryConfig),
            function (req, res, next) {
                if (framework_1.featureFlagRouter.isFeatureEnabled(index_engine_1.default.key)) {
                    return next();
                }
                return (0, http_1.maybeApplyLinkFilter)({
                    entryPoint: "product_sales_channel",
                    resourceId: "product_id",
                    filterableField: "sales_channel_id",
                })(req, res, next);
            },
            (0, utils_1.maybeApplyPriceListsFilter)(),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateProduct),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.CreateProduct, validators_2.AdminBatchUpdateProduct)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/export",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductsParams, QueryConfig.listProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/import",
        middlewares: [upload.single("file")],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/imports",
        middlewares: [(0, framework_1.validateAndTransformBody)(validators_2.AdminImportProducts)],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/import/:transaction_id/confirm",
        middlewares: [],
    },
    {
        method: ["GET"],
        matcher: "/admin/products/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateProduct),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/products/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/products/:id/variants",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantsParams, QueryConfig.listVariantConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateProductVariant),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.CreateProductVariant, validators_2.AdminBatchUpdateProductVariant)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
    // Note: New endpoint in v2
    {
        method: ["GET"],
        matcher: "/admin/products/:id/variants/:variant_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants/:variant_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateProductVariant),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/products/:id/variants/:variant_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    // Note: New endpoint in v2
    {
        method: ["GET"],
        matcher: "/admin/products/:id/options",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductOptionsParams, QueryConfig.listOptionConfig),
        ],
    },
    // Note: New endpoint in v2
    {
        method: ["GET"],
        matcher: "/admin/products/:id/options/:option_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductOptionParams, QueryConfig.retrieveOptionConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/options",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateProductOption),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/options/:option_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateProductOption),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/products/:id/options/:option_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductParams, QueryConfig.retrieveProductQueryConfig),
        ],
    },
    // Variant inventory item endpoints
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants/inventory-items/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.AdminBatchCreateVariantInventoryItem, validators_2.AdminBatchUpdateVariantInventoryItem, validators_2.AdminBatchDeleteVariantInventoryItem)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants/:variant_id/inventory-items",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateVariantInventoryItem),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/products/:id/variants/:variant_id/inventory-items/:inventory_item_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateVariantInventoryItem),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/products/:id/variants/:variant_id/inventory-items/:inventory_item_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetProductVariantParams, QueryConfig.retrieveVariantConfig),
        ],
    },
];
