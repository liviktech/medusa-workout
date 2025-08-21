"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminPriceListsRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var middlewares_1 = require("../../../utils/middlewares");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminPriceListsRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/price-lists",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListsParams, QueryConfig.listPriceListQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/price-lists/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListParams, QueryConfig.retrivePriceListQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-lists",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreatePriceList),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListPricesParams, QueryConfig.retrivePriceListQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-lists/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdatePriceList),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListPricesParams, QueryConfig.retrivePriceListQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-lists/:id/products",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminRemoveProductsPriceList),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListParams, QueryConfig.listPriceListQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/price-lists/:id/prices/batch",
        bodyParser: {
            sizeLimit: middlewares_1.DEFAULT_BATCH_ENDPOINTS_SIZE_LIMIT,
        },
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createBatchBody)(validators_2.AdminCreatePriceListPrice, validators_2.AdminUpdatePriceListPrice)),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetPriceListPricesParams, QueryConfig.listPriceListPriceQueryConfig),
        ],
    },
];
