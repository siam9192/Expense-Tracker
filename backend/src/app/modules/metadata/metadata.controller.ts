import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { sendSuccessResponse } from "../../utils/response";
import metadataService from "./metadata.service";

class MetadataController {
  getCurrentUserSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserSummary(req.user);
    sendSuccessResponse(res, {
      message: "Current user summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserMonthlyBudgetSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserMonthlyBudgetSummary(
      req.user,
    );
    sendSuccessResponse(res, {
      message: "Current user monthly budget summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserTransactionsSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserTransactionsSummary(
      req.user,
    );
    sendSuccessResponse(res, {
      message: "Current user transactions summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  getCurrentUserGoalSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserGoalsSummary(req.user);
    sendSuccessResponse(res, {
      message: "Current user goals summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  getCurrentUserCategoriesSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserCategoriesSummary(
      req.user,
    );
    sendSuccessResponse(res, {
      message: "Current user categories summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserExpenseStats = catchAsync(async (req, res) => {
    const sequence = req.query.sequence as string;
    const validSequence = ["day", "month", "year"].includes(sequence)
      ? sequence
      : "day";
    const result = await metadataService.getCurrentUserExpenseStats(
      req.user,
      validSequence as any,
    );
    sendSuccessResponse(res, {
      message: "Current user expense stats retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });

  getCurrentUserIncomeStats = catchAsync(async (req, res) => {
    const sequence = req.query.sequence as string;
    const validSequence = ["day", "month", "year"].includes(sequence)
      ? sequence
      : "day";
    const result = await metadataService.getCurrentUserIncomeStats(
      req.user,
      validSequence as any,
    );
    sendSuccessResponse(res, {
      message: "Current user income stats retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserFinanceStats = catchAsync(async (req, res) => {
    const sequence = req.query.sequence as string;
    const validSequence = ["month", "year"].includes(sequence)
      ? sequence
      : "month";
    const result = await metadataService.getCurrentUserFinanceStats(
      req.user,
      validSequence as any,
    );
    sendSuccessResponse(res, {
      message: "Current user finance stats retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserExpenseCategoryBreakdown = catchAsync(async (req, res) => {
    const sequence = req.query.sequence as string;
    const validSequence = ["month", "year"].includes(sequence)
      ? sequence
      : "month";
    const result = await metadataService.getCurrentUserExpenseCategoryBreakdown(
      req.user,
      validSequence as any,
    );
    sendSuccessResponse(res, {
      message: "Current user finance stats retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  getCurrentUserNotificationsSummary = catchAsync(async (req, res) => {
    const result = await metadataService.getCurrentUserNotificationsSummary(
      req.user,
    );
    sendSuccessResponse(res, {
      message: "Current user notifications summary retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new MetadataController();
