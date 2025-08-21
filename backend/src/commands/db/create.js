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
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbCreate = dbCreate;
var slugify_1 = require("slugify");
var path_1 = require("path");
var input_1 = require("@inquirer/input");
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
function connectClient(client) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, { connected: true, error: null }];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, { connected: false, error: error_1 }];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * A low-level utility to create the database. This util should
 * never exit the process implicitly.
 */
function dbCreate(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var dbName, envEditor, dbConnectionString, defaultValue, connectionOptions, clientConfig, clientConfigWithPostgresDB, client, connectionState;
        var _c;
        var db = _b.db, directory = _b.directory, interactive = _b.interactive;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    dbName = db;
                    envEditor = new utils_1.EnvEditor(directory);
                    return [4 /*yield*/, envEditor.load()
                        /**
                         * Ensure the "DATABASE_URL" is defined before we attempt to
                         * create the database.
                         *
                         * Also we will discard the database name from the connection
                         * string because the mentioned database might not exist
                         */
                    ];
                case 1:
                    _d.sent();
                    dbConnectionString = envEditor.get("DATABASE_URL");
                    if (!dbConnectionString) {
                        logger_1.logger.error("Missing \"DATABASE_URL\" inside the .env file. The value is required to connect to the PostgreSQL server");
                        return [2 /*return*/, false];
                    }
                    if (!!dbName) return [3 /*break*/, 4];
                    defaultValue = (_c = envEditor.get("DB_NAME")) !== null && _c !== void 0 ? _c : "medusa-".concat((0, slugify_1.default)((0, path_1.basename)(directory)));
                    if (!interactive) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, input_1.default)({
                            message: "Enter the database name",
                            default: defaultValue,
                            required: true,
                        })];
                case 2:
                    dbName = _d.sent();
                    return [3 /*break*/, 4];
                case 3:
                    dbName = defaultValue;
                    _d.label = 4;
                case 4:
                    connectionOptions = (0, utils_1.parseConnectionString)(dbConnectionString);
                    clientConfig = __assign({ host: connectionOptions.host, port: connectionOptions.port ? Number(connectionOptions.port) : undefined, user: connectionOptions.user, password: connectionOptions.password }, (connectionOptions.ssl ? { ssl: connectionOptions.ssl } : {}));
                    clientConfigWithPostgresDB = __assign({ host: connectionOptions.host, port: connectionOptions.port ? Number(connectionOptions.port) : undefined, user: connectionOptions.user, database: "postgres", password: connectionOptions.password }, (connectionOptions.ssl ? { ssl: connectionOptions.ssl } : {}));
                    client = (0, utils_1.createClient)(clientConfig);
                    return [4 /*yield*/, connectClient(client)
                        /**
                         * In case of an error, connect with the postgres DB
                         */
                    ];
                case 5:
                    connectionState = _d.sent();
                    if (!!connectionState.connected) return [3 /*break*/, 7];
                    client = (0, utils_1.createClient)(clientConfigWithPostgresDB);
                    return [4 /*yield*/, connectClient(client)];
                case 6:
                    connectionState = _d.sent();
                    _d.label = 7;
                case 7:
                    /**
                     * Notify user about the connection state
                     */
                    if (!connectionState.connected) {
                        logger_1.logger.error("Unable to establish database connection because of the following error");
                        logger_1.logger.error(connectionState.error);
                        return [2 /*return*/, false];
                    }
                    logger_1.logger.info("Connection established with the database \"".concat(dbName, "\""));
                    return [4 /*yield*/, (0, utils_1.dbExists)(client, dbName)];
                case 8:
                    if (!_d.sent()) return [3 /*break*/, 10];
                    logger_1.logger.info("Database \"".concat(dbName, "\" already exists"));
                    envEditor.set("DB_NAME", dbName, { withEmptyTemplateValue: true });
                    return [4 /*yield*/, envEditor.save()];
                case 9:
                    _d.sent();
                    logger_1.logger.info("Updated .env file with \"DB_NAME=".concat(dbName, "\""));
                    return [2 /*return*/, true];
                case 10: return [4 /*yield*/, (0, utils_1.createDb)(client, dbName)];
                case 11:
                    _d.sent();
                    logger_1.logger.info("Created database \"".concat(dbName, "\""));
                    envEditor.set("DB_NAME", dbName);
                    return [4 /*yield*/, envEditor.save()];
                case 12:
                    _d.sent();
                    logger_1.logger.info("Updated .env file with \"DB_NAME=".concat(dbName, "\""));
                    return [2 /*return*/, true];
            }
        });
    });
}
var main = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var created, error_2;
        var directory = _b.directory, interactive = _b.interactive, db = _b.db;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, dbCreate({ directory: directory, interactive: interactive, db: db })];
                case 1:
                    created = _c.sent();
                    process.exit(created ? 0 : 1);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _c.sent();
                    if (error_2.name === "ExitPromptError") {
                        process.exit();
                    }
                    logger_1.logger.error(error_2);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
};
exports.default = main;
