"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminReservationRoutesMiddlewares = void 0;
var QueryConfig = require("./query-config");
var framework_1 = require("@medusajs/framework");
var validators_1 = require("./validators");
exports.adminReservationRoutesMiddlewares = [
    {
        method: ["GET"],
        matcher: "/admin/reservations",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReservationsParams, QueryConfig.listTransformQueryConfig),
        ],
    },
    {
        method: ["GET"],
        matcher: "/admin/reservations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReservationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/reservations",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminCreateReservation),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReservationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
    {
        method: ["POST"],
        matcher: "/admin/reservations/:id",
        middlewares: [
            (0, framework_1.validateAndTransformBody)(validators_1.AdminUpdateReservation),
            (0, framework_1.validateAndTransformQuery)(validators_1.AdminGetReservationParams, QueryConfig.retrieveTransformQueryConfig),
        ],
    },
];
