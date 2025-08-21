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
var glob_1 = require("glob");
var logger_1 = require("@medusajs/framework/logger");
var utils_1 = require("@medusajs/framework/utils");
var path_1 = require("path");
var core_1 = require("@mikro-orm/core");
var postgresql_1 = require("@mikro-orm/postgresql");
var TERMINAL_SIZE = process.stdout.columns;
/**
 * Generate migrations for all scanned modules in a plugin
 */
var main = function (_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var moduleDescriptors, modulePaths, _i, modulePaths_1, path, moduleDirname, serviceName, entities, error_1;
        var directory = _b.directory;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    moduleDescriptors = [];
                    modulePaths = glob_1.glob.sync((0, utils_1.toUnixSlash)((0, path_1.join)(directory, "src", "modules", "*", "index.ts")));
                    _i = 0, modulePaths_1 = modulePaths;
                    _c.label = 1;
                case 1:
                    if (!(_i < modulePaths_1.length)) return [3 /*break*/, 5];
                    path = modulePaths_1[_i];
                    moduleDirname = (0, path_1.dirname)(path);
                    return [4 /*yield*/, getModuleServiceName(path)];
                case 2:
                    serviceName = _c.sent();
                    return [4 /*yield*/, getEntitiesForModule(moduleDirname)];
                case 3:
                    entities = _c.sent();
                    moduleDescriptors.push({
                        serviceName: serviceName,
                        migrationsPath: (0, path_1.join)(moduleDirname, "migrations"),
                        entities: entities,
                    });
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    /**
                     * Generating migrations
                     */
                    logger_1.logger.info("Generating migrations...");
                    return [4 /*yield*/, generateMigrations(moduleDescriptors)];
                case 6:
                    _c.sent();
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.info("Migrations generated");
                    process.exit();
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _c.sent();
                    console.log(new Array(TERMINAL_SIZE).join("-"));
                    logger_1.logger.error(error_1.message, error_1);
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
function getEntitiesForModule(path) {
    return __awaiter(this, void 0, void 0, function () {
        var entities, entityPaths, _i, entityPaths_1, entityPath, entityExports, validEntities;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    entities = [];
                    entityPaths = glob_1.glob.sync((0, utils_1.toUnixSlash)((0, path_1.join)(path, "models", "*.ts")), {
                        ignore: ["**/index.{js,ts}", "**/*.d.ts"],
                    });
                    _i = 0, entityPaths_1 = entityPaths;
                    _a.label = 1;
                case 1:
                    if (!(_i < entityPaths_1.length)) return [3 /*break*/, 4];
                    entityPath = entityPaths_1[_i];
                    return [4 /*yield*/, (0, utils_1.dynamicImport)(entityPath)];
                case 2:
                    entityExports = _a.sent();
                    validEntities = Object.values(entityExports).filter(function (potentialEntity) {
                        return (utils_1.DmlEntity.isDmlEntity(potentialEntity) ||
                            !!core_1.MetadataStorage.getMetadataFromDecorator(potentialEntity));
                    });
                    entities.push.apply(entities, validEntities);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, entities];
            }
        });
    });
}
function getModuleServiceName(path) {
    return __awaiter(this, void 0, void 0, function () {
        var moduleExport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, utils_1.dynamicImport)(path)];
                case 1:
                    moduleExport = _a.sent();
                    if (!moduleExport.default) {
                        throw new Error("The module should default export the `Module()`");
                    }
                    return [2 /*return*/, moduleExport.default.service.prototype.__joinerConfig()
                            .serviceName];
            }
        });
    });
}
function generateMigrations() {
    return __awaiter(this, arguments, void 0, function (moduleDescriptors) {
        var DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DATABASE_URL, _i, moduleDescriptors_1, moduleDescriptor, mikroOrmConfig, orm, migrator, result;
        var _a, _b, _c;
        if (moduleDescriptors === void 0) { moduleDescriptors = []; }
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    DB_HOST = (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : "localhost";
                    DB_USERNAME = (_b = process.env.DB_USERNAME) !== null && _b !== void 0 ? _b : "";
                    DB_PASSWORD = (_c = process.env.DB_PASSWORD) !== null && _c !== void 0 ? _c : "";
                    DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
                    DATABASE_URL = process.env.DATABASE_URL;
                    _i = 0, moduleDescriptors_1 = moduleDescriptors;
                    _d.label = 1;
                case 1:
                    if (!(_i < moduleDescriptors_1.length)) return [3 /*break*/, 5];
                    moduleDescriptor = moduleDescriptors_1[_i];
                    logger_1.logger.info("Generating migrations for module ".concat(moduleDescriptor.serviceName, "..."));
                    mikroOrmConfig = (0, utils_1.defineMikroOrmCliConfig)(moduleDescriptor.serviceName, __assign(__assign({ entities: moduleDescriptor.entities, host: DB_HOST, port: DB_PORT, user: DB_USERNAME, password: DB_PASSWORD }, (DATABASE_URL ? { clientUrl: DATABASE_URL } : {})), { migrations: {
                            path: moduleDescriptor.migrationsPath,
                        } }));
                    return [4 /*yield*/, postgresql_1.MikroORM.init(mikroOrmConfig)];
                case 2:
                    orm = _d.sent();
                    migrator = orm.getMigrator();
                    return [4 /*yield*/, migrator.createMigration()];
                case 3:
                    result = _d.sent();
                    if (result.fileName) {
                        logger_1.logger.info("Migration created: ".concat(result.fileName));
                    }
                    else {
                        logger_1.logger.info("No migration created");
                    }
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = main;
