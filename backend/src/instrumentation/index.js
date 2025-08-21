"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentHttpLayer = instrumentHttpLayer;
exports.instrumentRemoteQuery = instrumentRemoteQuery;
exports.instrumentWorkflows = instrumentWorkflows;
exports.registerOtel = registerOtel;
var lodash_1 = require("lodash");
var framework_1 = require("@medusajs/framework");
var http_1 = require("@medusajs/framework/http");
var telemetry_1 = require("@medusajs/framework/telemetry");
var orchestration_1 = require("@medusajs/framework/orchestration");
var EXCLUDED_RESOURCES = [".vite", "virtual:"];
function shouldExcludeResource(resource) {
    return EXCLUDED_RESOURCES.some(function (excludedResource) {
        return resource.includes(excludedResource);
    });
}
/**
 * Instrument the first touch point of the HTTP layer to report traces to
 * OpenTelemetry
 */
function instrumentHttpLayer() {
    var _this = this;
    var startCommand = require("../commands/start");
    var HTTPTracer = new telemetry_1.Tracer("@medusajs/http", "2.0.0");
    var SpanStatusCode = require("@opentelemetry/api").SpanStatusCode;
    startCommand.traceRequestHandler = function (requestHandler, req, res, handlerPath) { return __awaiter(_this, void 0, void 0, function () {
        var traceName;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!shouldExcludeResource(req.url)) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestHandler()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    traceName = handlerPath !== null && handlerPath !== void 0 ? handlerPath : "".concat(req.method, " ").concat(req.url);
                    return [4 /*yield*/, HTTPTracer.trace(traceName, function (span) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        span.setAttributes(__assign({ "http.route": handlerPath, "http.url": req.url, "http.method": req.method }, req.headers));
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, , 3, 4]);
                                        return [4 /*yield*/, requestHandler()];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        if (res.statusCode >= 500) {
                                            span.setStatus({
                                                code: SpanStatusCode.ERROR,
                                                message: "Failed with ".concat(res.statusMessage),
                                            });
                                        }
                                        span.setAttributes({ "http.statusCode": res.statusCode });
                                        span.end();
                                        return [7 /*endfinally*/];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Instrumenting the route handler to report traces to
     * OpenTelemetry
     */
    http_1.ApiLoader.traceRoute = function (handler) {
        return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var label, traceName;
            var _this = this;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!shouldExcludeResource(req.originalUrl)) return [3 /*break*/, 2];
                        return [4 /*yield*/, handler(req, res)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        label = (_b = (_a = req.route) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : "".concat(req.method, " ").concat(req.originalUrl);
                        traceName = "route handler: ".concat(label);
                        return [4 /*yield*/, HTTPTracer.trace(traceName, function (span) { return __awaiter(_this, void 0, void 0, function () {
                                var error_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            return [4 /*yield*/, handler(req, res)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            error_1 = _a.sent();
                                            span.setStatus({
                                                code: SpanStatusCode.ERROR,
                                                message: error_1.message || "Failed",
                                            });
                                            throw error_1;
                                        case 3:
                                            span.end();
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 3:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    /**
     * Instrumenting the middleware handler to report traces to
     * OpenTelemetry
     */
    http_1.ApiLoader.traceMiddleware = function (handler) {
        return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var traceName;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (shouldExcludeResource(req.originalUrl)) {
                            return [2 /*return*/, handler(req, res, next)];
                        }
                        traceName = "middleware: ".concat(handler.name ? (0, lodash_1.snakeCase)(handler.name) : "anonymous");
                        return [4 /*yield*/, HTTPTracer.trace(traceName, function (span) { return __awaiter(_this, void 0, void 0, function () {
                                var error_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            return [4 /*yield*/, handler(req, res, next)];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            error_2 = _a.sent();
                                            span.setStatus({
                                                code: SpanStatusCode.ERROR,
                                                message: error_2.message || "Failed",
                                            });
                                            throw error_2;
                                        case 3:
                                            span.end();
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
    };
}
/**
 * Instrument the queries made using the remote query
 */
function instrumentRemoteQuery() {
    var QueryTracer = new telemetry_1.Tracer("@medusajs/query", "2.0.0");
    var SpanStatusCode = require("@opentelemetry/api").SpanStatusCode;
    framework_1.Query.instrument.graphQuery(function (queryFn, queryOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, QueryTracer.trace("query.graph: ".concat(queryOptions.entity), function (span) { return __awaiter(_this, void 0, void 0, function () {
                            var err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        span.setAttributes({
                                            "query.fields": queryOptions.fields,
                                        });
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, 4, 5]);
                                        return [4 /*yield*/, queryFn()];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3:
                                        err_1 = _a.sent();
                                        span.setStatus({
                                            code: SpanStatusCode.ERROR,
                                            message: err_1.message,
                                        });
                                        throw err_1;
                                    case 4:
                                        span.end();
                                        return [7 /*endfinally*/];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    });
    framework_1.Query.instrument.remoteQuery(function (queryFn, queryOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var traceIdentifier;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        traceIdentifier = "entryPoint" in queryOptions
                            ? queryOptions.entryPoint
                            : "service" in queryOptions
                                ? queryOptions.service
                                : "__value" in queryOptions
                                    ? Object.keys(queryOptions.__value)[0]
                                    : "unknown source";
                        return [4 /*yield*/, QueryTracer.trace("remoteQuery: ".concat(traceIdentifier), function (span) { return __awaiter(_this, void 0, void 0, function () {
                                var error_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            span.setAttributes({
                                                "query.fields": "fields" in queryOptions ? queryOptions.fields : [],
                                            });
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, 4, 5]);
                                            return [4 /*yield*/, queryFn()];
                                        case 2: return [2 /*return*/, _a.sent()];
                                        case 3:
                                            error_3 = _a.sent();
                                            span.setStatus({
                                                code: SpanStatusCode.ERROR,
                                                message: error_3.message,
                                            });
                                            throw error_3;
                                        case 4:
                                            span.end();
                                            return [7 /*endfinally*/];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    });
    framework_1.Query.instrument.remoteDataFetch(function (fetchFn, serviceName, method, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, QueryTracer.trace("".concat((0, lodash_1.snakeCase)(serviceName), ".").concat((0, lodash_1.snakeCase)(method)), function (span) { return __awaiter(_this, void 0, void 0, function () {
                            var error_4;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        span.setAttributes({
                                            "fetch.select": options.select,
                                            "fetch.relations": options.relations,
                                        });
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, 4, 5]);
                                        return [4 /*yield*/, fetchFn()];
                                    case 2: return [2 /*return*/, _a.sent()];
                                    case 3:
                                        error_4 = _a.sent();
                                        span.setStatus({
                                            code: SpanStatusCode.ERROR,
                                            message: error_4.message,
                                        });
                                        throw error_4;
                                    case 4:
                                        span.end();
                                        return [7 /*endfinally*/];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    });
}
/**
 * Instrument the workflows and steps execution
 */
function instrumentWorkflows() {
    var _this = this;
    var WorkflowsTracer = new telemetry_1.Tracer("@medusajs/framework/workflows-sdk", "2.0.0");
    orchestration_1.TransactionOrchestrator.traceTransaction = function (transactionResumeFn, metadata) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WorkflowsTracer.trace("workflow:".concat((0, lodash_1.snakeCase)(metadata.model_id)), function (span) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        span.setAttribute("workflow.transaction_id", metadata.transaction_id);
                                        if (metadata.flow_metadata) {
                                            Object.entries(metadata.flow_metadata).forEach(function (_a) {
                                                var key = _a[0], value = _a[1];
                                                span.setAttribute("workflow.flow_metadata.".concat(key), value);
                                            });
                                        }
                                        return [4 /*yield*/, transactionResumeFn().finally(function () { return span.end(); })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
    orchestration_1.TransactionOrchestrator.traceStep = function (stepHandler, metadata) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WorkflowsTracer.trace("step:".concat((0, lodash_1.snakeCase)(metadata.action), ":").concat(metadata.type), function (span) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        Object.entries(metadata).forEach(function (_a) {
                                            var key = _a[0], value = _a[1];
                                            span.setAttribute("workflow.step.".concat(key), value);
                                        });
                                        return [4 /*yield*/, stepHandler().finally(function () { return span.end(); })];
                                    case 1: 
                                    // TODO: should we report error and re throw it?
                                    return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); };
}
/**
 * A helper function to configure the OpenTelemetry SDK with some defaults.
 * For better/more control, please configure the SDK manually.
 *
 * You will have to install the following packages within your app for
 * telemetry to work
 *
 * - @opentelemetry/sdk-node
 * - @opentelemetry/resources
 * - @opentelemetry/sdk-trace-node
 * - @opentelemetry/instrumentation-pg
 * - @opentelemetry/instrumentation
 */
function registerOtel(options) {
    var _a = __assign({ instrument: {}, instrumentations: [] }, options), exporter = _a.exporter, serviceName = _a.serviceName, instrument = _a.instrument, instrumentations = _a.instrumentations, nodeSdkOptions = __rest(_a, ["exporter", "serviceName", "instrument", "instrumentations"]);
    var _b = require("@opentelemetry/resources"), Resource = _b.Resource, resourceFromAttributes = _b.resourceFromAttributes;
    var NodeSDK = require("@opentelemetry/sdk-node").NodeSDK;
    var SimpleSpanProcessor = require("@opentelemetry/sdk-trace-node").SimpleSpanProcessor;
    if (instrument.db) {
        var PgInstrumentation = require("@opentelemetry/instrumentation-pg").PgInstrumentation;
        instrumentations.push(new PgInstrumentation());
    }
    if (instrument.http) {
        instrumentHttpLayer();
    }
    if (instrument.query) {
        instrumentRemoteQuery();
    }
    if (instrument.workflows) {
        instrumentWorkflows();
    }
    var sdk = new NodeSDK(__assign(__assign({ serviceName: serviceName, 
        /**
         * Older version of "@opentelemetry/resources" exports the "Resource" class.
         * Whereas, the new one exports the "resourceFromAttributes" method.
         */
        resource: resourceFromAttributes
            ? resourceFromAttributes({
                "service.name": serviceName,
            })
            : new Resource({ "service.name": serviceName }), spanProcessor: new SimpleSpanProcessor(exporter) }, nodeSdkOptions), { instrumentations: instrumentations }));
    sdk.start();
    return sdk;
}
