import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";

import countryService from "./country.service";

class CountryController {
  getPublicCountries = catchAsync(async (req, res) => {
    const result = await countryService.getPublicCountriesFromDB(
      pick(req.query, ["search_term"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Countries retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new CountryController();
