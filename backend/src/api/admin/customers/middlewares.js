"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCustomerRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var framework_1 = require("@medusajs/framework");
var validators_2 = require("../../utils/validators");
exports.adminCustomerRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/customers",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customers",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateCustomer),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/customers/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customers/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateCustomer),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customers/:id/addresses",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateCustomerAddress),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/customers/:id/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerAddressParams, QueryConfig.retrieveAddressTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customers/:id/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateCustomerAddress),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/customers/:id/addresses/:address_id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/customers/:id/addresses",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerAddressesParams, QueryConfig.listAddressesTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customers/:id/customer-groups",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_2.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminCustomerParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
