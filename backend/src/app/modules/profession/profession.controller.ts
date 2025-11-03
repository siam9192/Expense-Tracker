import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import professionService from "./profession.service";

class ProfessionController {
  getPublicProfessions = catchAsync(async (req, res) => {
    const result = await professionService.getPublicProfessionsFromDB(
      pick(req.query, ["search_term"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Professions retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new ProfessionController();
