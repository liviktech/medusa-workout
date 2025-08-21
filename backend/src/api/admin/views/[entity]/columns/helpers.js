"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEntityColumns = exports.DEFAULT_COLUMN_ORDERS = exports.getTypeInfoFromGraphQLType = exports.shouldExcludeField = exports.isSingleRelationship = exports.isArrayField = exports.getUnderlyingType = exports.formatFieldName = exports.getColumnCategory = void 0;
var utils_1 = require("@medusajs/framework/utils");
var modules_sdk_1 = require("@medusajs/framework/modules-sdk");
// Determine column category based on field characteristics
var getColumnCategory = function (fieldName, dataType, semanticType) {
    // Check semantic type first
    if (semanticType === "timestamp")
        return "timestamp";
    if (semanticType === "status")
        return "status";
    // Check field name patterns
    if (fieldName.includes("_id") ||
        fieldName === "id" ||
        fieldName.includes("display_id") ||
        fieldName === "code") {
        return "identifier";
    }
    if (fieldName.includes("status") || fieldName === "state") {
        return "status";
    }
    if (fieldName.includes("_at") || fieldName.includes("date")) {
        return "timestamp";
    }
    if (fieldName.includes("total") ||
        fieldName.includes("amount") ||
        fieldName.includes("price") ||
        semanticType === "currency") {
        return "metric";
    }
    if (dataType === "object" || fieldName.includes("_display")) {
        return "relationship";
    }
    return "metadata";
};
exports.getColumnCategory = getColumnCategory;
// Helper function to format field name for display
var formatFieldName = function (field) {
    return field
        .split(/[._]/)
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join(" ");
};
exports.formatFieldName = formatFieldName;
// Helper function to get the underlying type from wrapped types (NonNull, List)
var getUnderlyingType = function (type) {
    if (type.ofType) {
        return (0, exports.getUnderlyingType)(type.ofType);
    }
    return type;
};
exports.getUnderlyingType = getUnderlyingType;
// Helper function to check if a field type is an array/list
var isArrayField = function (type) {
    if ((0, utils_1.isListType)(type)) {
        return true;
    }
    if ((0, utils_1.isNonNullType)(type)) {
        return (0, exports.isArrayField)(type.ofType);
    }
    return false;
};
exports.isArrayField = isArrayField;
// Helper function to check if a field is a single relationship (many-to-one, one-to-one)
var isSingleRelationship = function (type) {
    // If it's a list, it's a one-to-many or many-to-many relationship
    if ((0, exports.isArrayField)(type)) {
        return false;
    }
    // Get the underlying type (removing NonNull wrappers)
    var underlyingType = (0, exports.getUnderlyingType)(type);
    // Check if it's a GraphQL object type (relationship)
    return underlyingType instanceof utils_1.GraphQLObjectType;
};
exports.isSingleRelationship = isSingleRelationship;
// Helper function to check if a field should be excluded based on filtering rules
var shouldExcludeField = function (fieldName, fieldFilters) {
    var _a, _b, _c;
    // Check if field matches any exclude suffixes
    if ((_a = fieldFilters.excludeSuffixes) === null || _a === void 0 ? void 0 : _a.some(function (suffix) {
        return fieldName.endsWith(suffix);
    })) {
        return true;
    }
    // Check if field matches any exclude prefixes
    if ((_b = fieldFilters.excludePrefixes) === null || _b === void 0 ? void 0 : _b.some(function (prefix) {
        return fieldName.startsWith(prefix);
    })) {
        return true;
    }
    // Check if field is in the exclude fields list
    if ((_c = fieldFilters.excludeFields) === null || _c === void 0 ? void 0 : _c.includes(fieldName)) {
        return true;
    }
    return false;
};
exports.shouldExcludeField = shouldExcludeField;
// Helper function to determine data type and semantic type from GraphQL type
var getTypeInfoFromGraphQLType = function (type, fieldName) {
    var underlyingType = type ? (0, exports.getUnderlyingType)(type) : null;
    // Check field name patterns first for more specific types
    if (fieldName.includes("_at") || fieldName.includes("date")) {
        return {
            data_type: "date",
            semantic_type: "timestamp",
            context: fieldName.includes("created")
                ? "creation"
                : fieldName.includes("updated")
                    ? "update"
                    : "generic",
        };
    }
    else if (fieldName.includes("total") ||
        fieldName.includes("amount") ||
        fieldName.includes("price")) {
        return {
            data_type: "currency",
            semantic_type: "currency",
            context: fieldName.includes("total") ? "total" : "amount",
        };
    }
    else if (fieldName.includes("count") || fieldName.includes("quantity")) {
        return {
            data_type: "number",
            semantic_type: "count",
            context: fieldName.includes("quantity") ? "quantity" : "count",
        };
    }
    else if (fieldName.includes("status")) {
        return {
            data_type: "enum",
            semantic_type: "status",
            context: fieldName.includes("payment")
                ? "payment"
                : fieldName.includes("fulfillment")
                    ? "fulfillment"
                    : "generic",
        };
    }
    else if (fieldName.includes("type") || fieldName.includes("is_")) {
        return {
            data_type: "enum",
            semantic_type: "enum",
            context: "generic",
        };
    }
    else if (fieldName === "metadata" || fieldName.includes("json")) {
        return {
            data_type: "object",
            semantic_type: "object",
            context: "metadata",
        };
    }
    else if (fieldName === "display_id") {
        return {
            data_type: "string",
            semantic_type: "identifier",
            context: "order",
        };
    }
    else if (fieldName === "email") {
        return {
            data_type: "string",
            semantic_type: "email",
            context: "contact",
        };
    }
    // Then check GraphQL type
    if (underlyingType && (0, utils_1.isScalarType)(underlyingType)) {
        switch (underlyingType.name) {
            case "Int":
            case "Float":
                return {
                    data_type: "number",
                    semantic_type: "number",
                    context: "generic",
                };
            case "Boolean":
                return {
                    data_type: "boolean",
                    semantic_type: "boolean",
                    context: "generic",
                };
            case "DateTime":
                return {
                    data_type: "date",
                    semantic_type: "timestamp",
                    context: "generic",
                };
            case "JSON":
                return {
                    data_type: "object",
                    semantic_type: "object",
                    context: "json",
                };
            default:
                return {
                    data_type: "string",
                    semantic_type: "string",
                    context: "generic",
                };
        }
    }
    else if (underlyingType && (0, utils_1.isEnumType)(underlyingType)) {
        return {
            data_type: "enum",
            semantic_type: "enum",
            context: "generic",
        };
    }
    else {
        return {
            data_type: "object",
            semantic_type: "object",
            context: "relationship",
        };
    }
};
exports.getTypeInfoFromGraphQLType = getTypeInfoFromGraphQLType;
exports.DEFAULT_COLUMN_ORDERS = {
    display_id: 100,
    created_at: 200,
    customer_display: 300,
    "sales_channel.name": 400,
    fulfillment_status: 500,
    payment_status: 600,
    total: 700,
    country: 800,
};
/**
 * Generates columns for a given entity by introspecting the GraphQL schema
 * @param entity - The entity name to generate columns for
 * @param entityMapping - The entity mapping configuration
 * @returns Array of columns or null if generation fails
 */
var generateEntityColumns = function (entity, entityMapping) {
    var joinerConfigs = modules_sdk_1.MedusaModule.getAllJoinerConfigs();
    var schemaFragments = [];
    var hasEntityType = false;
    for (var _i = 0, joinerConfigs_1 = joinerConfigs; _i < joinerConfigs_1.length; _i++) {
        var config = joinerConfigs_1[_i];
        if (config.schema) {
            schemaFragments.push(config.schema);
            if (config.schema.includes("type ".concat(entityMapping.graphqlType, " {"))) {
                hasEntityType = true;
            }
        }
    }
    if (!hasEntityType || schemaFragments.length === 0) {
        return null;
    }
    var scalarDefinitions = "\n    scalar DateTime\n    scalar JSON\n  ";
    var allSchemas = __spreadArray([scalarDefinitions], schemaFragments, true);
    var mergedSchemaAST = (0, utils_1.mergeTypeDefs)(allSchemas);
    var mergedSchemaString = (0, utils_1.print)(mergedSchemaAST);
    var cleanedSchemaString = (0, utils_1.cleanGraphQLSchema)(mergedSchemaString).schema;
    var schema = (0, utils_1.makeExecutableSchema)({
        typeDefs: cleanedSchemaString,
        resolvers: {}, // Empty resolvers since we only need the schema for introspection
    });
    var schemaTypeMap = schema.getTypeMap();
    var entityType = schemaTypeMap[entityMapping.graphqlType];
    var allDirectFields = (0, utils_1.graphqlSchemaToFields)(schemaTypeMap, entityMapping.graphqlType, []);
    // Filter out problematic fields
    var directFields = allDirectFields.filter(function (fieldName) {
        var field = entityType === null || entityType === void 0 ? void 0 : entityType.getFields()[fieldName];
        if (!field)
            return true;
        var isArray = (0, exports.isArrayField)(field.type);
        if (isArray) {
            return false;
        }
        if ((0, exports.shouldExcludeField)(fieldName, entityMapping.fieldFilters)) {
            return false;
        }
        return true;
    });
    if (entity === "orders" && !directFields.includes("display_id")) {
        directFields.unshift("display_id");
    }
    var relationMap = (0, utils_1.extractRelationsFromGQL)(new Map(Object.entries(schemaTypeMap)));
    var allEntityRelations = relationMap.get(entityMapping.graphqlType);
    var filteredUtilityRelations = new Map();
    if (allEntityRelations && entityType) {
        var fields = entityType.getFields();
        for (var _a = 0, allEntityRelations_1 = allEntityRelations; _a < allEntityRelations_1.length; _a++) {
            var _b = allEntityRelations_1[_a], fieldName = _b[0], relatedTypeName = _b[1];
            var field = fields[fieldName];
            if ((0, exports.shouldExcludeField)(fieldName, entityMapping.fieldFilters)) {
                continue;
            }
            if (field && (0, exports.isSingleRelationship)(field.type)) {
                filteredUtilityRelations.set(fieldName, relatedTypeName);
            }
        }
    }
    var manualRelations = new Map();
    if (entityType) {
        var fields = entityType.getFields();
        Object.entries(fields).forEach(function (_a) {
            var fieldName = _a[0], field = _a[1];
            if ((0, exports.shouldExcludeField)(fieldName, entityMapping.fieldFilters)) {
                return;
            }
            if ((0, exports.isSingleRelationship)(field.type)) {
                var fieldType = (0, exports.getUnderlyingType)(field.type);
                manualRelations.set(fieldName, fieldType.name);
            }
        });
    }
    var finalRelations = filteredUtilityRelations.size > 0
        ? filteredUtilityRelations
        : manualRelations;
    if (directFields.length === 0) {
        return null;
    }
    var directColumns = directFields.map(function (fieldName) {
        var _a;
        var displayName = (0, exports.formatFieldName)(fieldName);
        var type = schemaTypeMap[entityMapping.graphqlType];
        var fieldDef = (_a = type === null || type === void 0 ? void 0 : type.getFields()) === null || _a === void 0 ? void 0 : _a[fieldName];
        var typeInfo = fieldDef
            ? (0, exports.getTypeInfoFromGraphQLType)(fieldDef.type, fieldName)
            : (0, exports.getTypeInfoFromGraphQLType)(null, fieldName);
        var sortable = !fieldName.includes("metadata") && typeInfo.data_type !== "object";
        var isDefaultField = entityMapping.defaultVisibleFields.includes(fieldName);
        var defaultOrder = exports.DEFAULT_COLUMN_ORDERS[fieldName] || (isDefaultField ? 500 : 850);
        var category = (0, exports.getColumnCategory)(fieldName, typeInfo.data_type, typeInfo.semantic_type);
        return {
            id: fieldName,
            name: displayName,
            description: "".concat(displayName, " field"),
            field: fieldName,
            sortable: sortable,
            hideable: true,
            default_visible: entityMapping.defaultVisibleFields.includes(fieldName),
            data_type: typeInfo.data_type,
            semantic_type: typeInfo.semantic_type,
            context: typeInfo.context,
            default_order: defaultOrder,
            category: category,
        };
    });
    var relationshipColumns = [];
    if (finalRelations.size > 0) {
        var _loop_1 = function (relationName, relatedTypeName) {
            var allRelatedFields = (0, utils_1.graphqlSchemaToFields)(schemaTypeMap, relatedTypeName, []);
            // Filter out problematic fields from related type
            var relatedType = schemaTypeMap[relatedTypeName];
            var relatedFields = allRelatedFields.filter(function (fieldName) {
                var field = relatedType === null || relatedType === void 0 ? void 0 : relatedType.getFields()[fieldName];
                if (!field)
                    return true;
                var isArray = (0, exports.isArrayField)(field.type);
                if (isArray) {
                    return false;
                }
                // Apply entity-specific field filters to related fields as well
                if ((0, exports.shouldExcludeField)(fieldName, entityMapping.fieldFilters)) {
                    return false;
                }
                return true;
            });
            var limitedFields = relatedFields.slice(0, 10);
            limitedFields.forEach(function (fieldName) {
                var _a;
                var fieldPath = "".concat(relationName, ".").concat(fieldName);
                var displayName = "".concat((0, exports.formatFieldName)(relationName), " ").concat((0, exports.formatFieldName)(fieldName));
                var relatedType = schemaTypeMap[relatedTypeName];
                var fieldDef = (_a = relatedType === null || relatedType === void 0 ? void 0 : relatedType.getFields()) === null || _a === void 0 ? void 0 : _a[fieldName];
                var typeInfo = fieldDef
                    ? (0, exports.getTypeInfoFromGraphQLType)(fieldDef.type, fieldName)
                    : {
                        data_type: "string",
                        semantic_type: "string",
                        context: "generic",
                    };
                var sortable = fieldPath.includes(".")
                    ? false
                    : ["name", "title", "email", "handle"].includes(fieldName);
                var isDefaultVisible = entityMapping.defaultVisibleFields.includes(fieldPath);
                // Get default order and category
                // If field is not in default visible fields, place it after country (850)
                var isDefaultField = entityMapping.defaultVisibleFields.includes(fieldPath);
                var defaultOrder = exports.DEFAULT_COLUMN_ORDERS[fieldPath] || (isDefaultField ? 700 : 850);
                var category = (0, exports.getColumnCategory)(fieldPath, typeInfo.data_type, typeInfo.semantic_type);
                relationshipColumns.push({
                    id: fieldPath,
                    name: displayName,
                    description: "".concat(displayName, " from related ").concat(relatedTypeName),
                    field: fieldPath,
                    sortable: sortable,
                    hideable: true,
                    default_visible: isDefaultVisible,
                    data_type: typeInfo.data_type,
                    semantic_type: typeInfo.semantic_type,
                    context: typeInfo.context,
                    relationship: {
                        entity: relatedTypeName,
                        field: fieldName,
                    },
                    default_order: defaultOrder,
                    category: category,
                });
            });
        };
        for (var _c = 0, finalRelations_1 = finalRelations; _c < finalRelations_1.length; _c++) {
            var _d = finalRelations_1[_c], relationName = _d[0], relatedTypeName = _d[1];
            _loop_1(relationName, relatedTypeName);
        }
    }
    // Generate computed columns
    var computedColumns = [];
    if (entityMapping.computedColumns) {
        for (var _e = 0, _f = Object.entries(entityMapping.computedColumns); _e < _f.length; _e++) {
            var _g = _f[_e], columnId = _g[0], columnConfig = _g[1];
            // Get default order and category for computed columns
            // If field is not in default visible fields, place it after country (850)
            var isDefaultField = entityMapping.defaultVisibleFields.includes(columnId);
            var defaultOrder = exports.DEFAULT_COLUMN_ORDERS[columnId] || (isDefaultField ? 600 : 850);
            var category = (0, exports.getColumnCategory)(columnId, "string", "computed");
            computedColumns.push({
                id: columnId,
                name: columnConfig.name,
                description: "".concat(columnConfig.name, " (computed)"),
                field: columnId,
                sortable: false, // Computed columns can't be sorted server-side
                hideable: true,
                default_visible: entityMapping.defaultVisibleFields.includes(columnId),
                data_type: "string", // Computed columns typically output strings
                semantic_type: "computed",
                context: "display",
                computed: {
                    type: columnConfig.computation_type,
                    required_fields: columnConfig.required_fields,
                    optional_fields: columnConfig.optional_fields || [],
                },
                default_order: defaultOrder,
                category: category,
            });
        }
    }
    var allColumns = __spreadArray(__spreadArray(__spreadArray([], directColumns, true), relationshipColumns, true), computedColumns, true);
    return allColumns;
};
exports.generateEntityColumns = generateEntityColumns;
