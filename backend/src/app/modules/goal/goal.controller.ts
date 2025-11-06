import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import goalService from "./goal.service";

class GoalController {
  getCurrentUserGoals = catchAsync(async (req, res) => {
    const result = await goalService.getCurrentUserGoalsFromDB(
      req.user,
      pick(req.query, ["search_term", "status"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Current user goals retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  createGoal = catchAsync(async (req, res) => {
    const result = await goalService.createGoalIntoDB(req.user, req.body);
    sendSuccessResponse(res, {
      message: "Goal created successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  createGoalDeposit = catchAsync(async (req, res) => {
    const result = await goalService.createGoalDepositIntoDB(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Current user goal created successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  createGoalWithdraw = catchAsync(async (req, res) => {
    const result = await goalService.createGoalWithdrawIntoDB(
      req.user,
      req.params.id,
    );
    sendSuccessResponse(res, {
      message: "Goal withdraw created successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new GoalController();
