"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserRoutesMiddlewares = void 0;
var authenticate_middleware_1 = require("../../../utils/middlewares/authenticate-middleware");
var framework_1 = require("@medusajs/framework");
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
// TODO: Due to issues with our routing (and using router.use for applying middlewares), we have to opt-out of global auth in all routes, and then reapply it here.
// See https://medusacorp.slack.com/archives/C025KMS13SA/p1716455350491879 for details.
exports.adminUserRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/users",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["bearer", "session"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetUsersParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/users/:id",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["bearer", "session"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetUserParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/users/me",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["bearer", "session"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetUserParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/users/:id",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["bearer", "session"]),
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateUser),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetUserParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/users/:id",
        middlewares: [(0, authenticate_middleware_1.authenticate)("user", ["bearer", "session"])],
    },
];
