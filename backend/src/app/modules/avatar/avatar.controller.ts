import { paginationOptionPicker } from "../../helpers/pagination.helper";
import httpStatus from "../../shared/http-status";
import catchAsync from "../../utils/catchAsync";
import { pick } from "../../utils/helpers";
import { sendSuccessResponse } from "../../utils/response";
import avatarService from "./avatar.service";

class AvatarController {
  getPublicAvatars = catchAsync(async (req, res) => {
    const result = await avatarService.getPublicAvatarsFromDB(
      pick(req.query, ["search_term"]),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: "Avatars retrieved successfully",
      status_code: httpStatus.OK,
      data: result,
    });
  });
}

export default new AvatarController();
