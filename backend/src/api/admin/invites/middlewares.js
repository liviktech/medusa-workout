"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminInviteRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var validators_1 = require("./validators");
var authenticate_middleware_1 = require("../../../utils/middlewares/authenticate-middleware");
var framework_1 = require("@medusajs/framework");
// TODO: Due to issues with our routing (and using router.use for applying middlewares), we have to opt-out of global auth in all routes, and then reapply it here.
// See https://medusacorp.slack.com/archives/C025KMS13SA/p1716455350491879 for details.
exports.adminInviteRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/invites",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["session", "bearer", "api-key"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInvitesParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/invites",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["session", "bearer", "api-key"]),
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateInvite),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInviteParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: "POST",
        matcher: "/admin/invites/accept",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["session", "bearer"], {
                allowUnregistered: true,
            }),
            (0, framework_1.validateAndTransformBody)(validators_1.AdminInviteAccept),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInviteAcceptParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/invites/:id",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["session", "bearer", "api-key"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInviteParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["DELETE"],
        matcher: "/admin/invites/:id",
        middlewares: [(0, authenticate_middleware_1.authenticate)("user", ["session", "bearer", "api-key"])],
    },
    {
        method: "POST",
        matcher: "/admin/invites/:id/resend",
        middlewares: [
            (0, authenticate_middleware_1.authenticate)("user", ["session", "bearer", "api-key"]),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetInviteParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
