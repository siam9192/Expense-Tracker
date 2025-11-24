import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import transactionService from "./transaction.service";

class TransactionController {
  getCurrentUserTransactions = catchAsync(async (req, res) => {
    console.log(req.query);
    const result = await transactionService.getCurrentUserTransactionsFromDB(
      req.user,
      pick(req.query, ["id", "type"]),
      paginationOptionPicker(req.query),
    );

    sendSuccessResponse(res, {
      message: "Goals retrieved successfully",
      status_code: httpStatus.OK,
      ...result,
    });
  });
  getCurrentUserTransactionById = catchAsync(async (req, res) => {
    const result = await transactionService.getCurrentUserTransactionById(
      req.user,
      req.params.id,
    );
    sendSuccessResponse(res, {
      message: "Transaction retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
  createTransaction = catchAsync(async (req, res) => {
    const result = await transactionService.createTransactionIntoDB(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      message: "Transaction created successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new TransactionController();
