"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationOptionPicker = exports.calculatePagination = exports.ESortOrder = void 0;
const constant_1 = require("../utils/constant");
const helpers_1 = require("../utils/helpers");
var ESortOrder;
(function (ESortOrder) {
    ESortOrder["ASC"] = "asc";
    ESortOrder["DESC"] = "desc";
})(ESortOrder || (exports.ESortOrder = ESortOrder = {}));
const calculatePagination = (paginationOptions, options) => {
    // Parse pagination values with fallbacks
    let page = Number(paginationOptions.page) || (options === null || options === void 0 ? void 0 : options.defaultPage) || 1;
    let limit = Number(paginationOptions.limit) ||
        (options === null || options === void 0 ? void 0 : options.limitOverride) ||
        (options === null || options === void 0 ? void 0 : options.defaultLimit) ||
        16;
    const isValidSortOrder = Object.values(ESortOrder).includes(paginationOptions.sortOrder);
    let sortOrder = isValidSortOrder
        ? paginationOptions.sortOrder
        : (options === null || options === void 0 ? void 0 : options.defaultSortOrder) || ESortOrder.DESC;
    let sortBy = paginationOptions.sortBy || (options === null || options === void 0 ? void 0 : options.defaultSortBy) || "created_at";
    const skip = (page - 1) * limit;
    return {
        page,
        limit,
        skip,
        sortOrder,
        sortBy,
    };
};
exports.calculatePagination = calculatePagination;
// Strongly typed pick for pagination
const paginationOptionPicker = (query) => (0, helpers_1.pick)(query, constant_1.PAGINATION_OPTION_KEYS);
exports.paginationOptionPicker = paginationOptionPicker;
