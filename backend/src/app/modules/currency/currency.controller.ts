import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import currencyService from "./currency.service";

class CurrencyController {
  getPublicCurrencies = catchAsync(async (req, res) => {
    const result = await currencyService.getPublicCurrenciesFromDB(
      pick(req.query, ["search_term"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Currencies retrieved successfully",
      status_code: httpStatus.OK,
      ...result,
    });
  });
}

export default new CurrencyController();
