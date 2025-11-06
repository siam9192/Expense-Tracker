import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";
import categoryController from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import categoryValidation from "./category.validation";

const router = Router();

router.get(
  "/me",
  auth([UserRole.USER]),

  categoryController.getCurrentUserCategories,
);

router.post(
  "/me",
  auth([UserRole.USER]),
  validateRequest(
    categoryValidation.createCurrentUserCategoryPayloadValidation,
  ),
  categoryController.createCurrentUserCategory,
);

router.put(
  "/me/:categoryId",
  auth([UserRole.USER]),
  validateRequest(
    categoryValidation.updateCurrentUserCategoryPayloadValidation,
  ),
  categoryController.updateCurrentUserCategoryById,
);
router.delete(
  "/me/:categoryId",
  auth([UserRole.USER]),
  categoryController.softDeleteCurrentUserCategoryById,
);

const categoryRouter = router;
export default categoryRouter;
