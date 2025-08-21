"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCustomerRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var authenticate_middleware_1 = require("../../../utils/middlewares/authenticate-middleware");
var framework_1 = require("@medusajs/framework");
exports.storeCustomerRoutesMiddlewares = [
    {
        method: ["POST"],
        matcher: "/store/customers",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("customer", ["session", "bearer"], {
                allowUnregistered: true,
            }),
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreateCustomer),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "ALL",
        matcher: "/store/customers/me*",
        middlewares: [(0, authenticate_middleware_1.authenticate)("customer", ["session", "bearer"])],
    },
    {
        method: ["GET"],
        matcher: "/store/customers/me",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/customers/me",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreUpdateCustomer),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/customers/me/addresses",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerAddressesParams, QueryConfig.listAddressesTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/customers/me/addresses",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreCreateCustomerAddress),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/store/customers/me/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerAddressParams, QueryConfig.retrieveAddressTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/store/customers/me/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.StoreUpdateCustomerAddress),
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/store/customers/me/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.StoreGetCustomerAddressParams, QueryConfig.retrieveAddressTransformQueryConfig),
        ],
    },
];
