import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import categoryService from "./category.service";

class CategoryController {
  getCurrentUserCategories = catchAsync(async (req, res) => {
    const result = await categoryService.getCurrentUserCategoriesFromDB(
      req.user,
      pick(req.query, ["search_term"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Current user categories retrieved  successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  createCurrentUserCategory = catchAsync(async (req, res) => {
    const result = await categoryService.createCurrentUserCategory(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Category created successfully",
      status_code: httpStatus.CREATED,
      data: result,
    });
  });
  updateCurrentUserCategoryById = catchAsync(async (req, res) => {
    const result = await categoryService.updateCurrentUserCategoryById(
      req.user,
      req.params.categoryId,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Category created successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  softDeleteCurrentUserCategoryById = catchAsync(async (req, res) => {
    const result = await categoryService.softDeleteCurrentUserCategoryById(
      req.user,
      req.params.categoryId,
    );
    sendSuccessResponse(res, {
      message: "Category deleted successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new CategoryController();
