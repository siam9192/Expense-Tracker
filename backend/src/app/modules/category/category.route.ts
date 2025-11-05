import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "../user/user.interface";
import categoryController from "./category.controller";

const router = Router();

router.get(
  "/me",
  auth([UserRole.USER]),
  categoryController.getCurrentUserCategories,
);

router.post(
  "/me",
  auth([UserRole.USER]),
  categoryController.createCurrentUserCategory,
);

router.put(
  "/me/:categoryId",
  auth([UserRole.USER]),
  categoryController.updateCurrentUserCategoryById,
);
router.delete(
  "/me/:categoryId",
  auth([UserRole.USER]),
  categoryController.softDeleteCurrentUserCategoryById,
);

const categoryRouter = router;
export default categoryRouter;
