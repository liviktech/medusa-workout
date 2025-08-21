"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCustomerGroupRoutesMiddlewares = void 0;
var framework_1 = require("@medusajs/framework");
var validators_1 = require("../../utils/validators");
var QueryConfig = require("./query-config");
var validators_2 = require("./validators");
exports.adminCustomerGroupRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/customer-groups",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCustomerGroupsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/customer-groups/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCustomerGroupParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customer-groups",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminCreateCustomerGroup),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCustomerGroupParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customer-groups/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_2.AdminUpdateCustomerGroup),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCustomerGroupParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/customer-groups/:id/customers",
        middlewares: [
            (0, framework_1.validateAndTransformBody)((0, validators_1.createLinkBody)()),
            (0, framework_1.validateAndTransformQuery)(validators_2.AdminGetCustomerGroupParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
