"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.storeGlobalMiddlewareMock = exports.customersCreateMiddlewareMock = exports.customersGlobalMiddlewareMock = void 0;
exports.customersGlobalMiddlewareMock = jest.fn();
exports.customersCreateMiddlewareMock = jest.fn();
exports.storeGlobalMiddlewareMock = jest.fn();
exports.config = {
    projectConfig: {
        databaseLogging: false,
        http: {
            authCors: "http://localhost:9000",
            storeCors: "http://localhost:8000",
            adminCors: "http://localhost:7001",
            jwtSecret: "supersecret",
            cookieSecret: "superSecret",
        },
    },
    featureFlags: {},
    plugins: [],
};
