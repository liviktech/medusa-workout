"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMock = void 0;
var framework_1 = require("@medusajs/framework");
exports.errorHandlerMock = jest
    .fn()
    .mockImplementation(function (err, req, res, next) {
    console.log("errorHandlerMock", err);
    return res.status(400).json({
        type: err.code.toLowerCase(),
        message: err.message,
    });
});
exports.default = (0, framework_1.defineMiddlewares)({
    errorHandler: function (err, req, res, next) { return (0, exports.errorHandlerMock)(err, req, res, next); },
});
