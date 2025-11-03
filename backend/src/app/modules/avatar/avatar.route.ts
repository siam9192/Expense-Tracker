import { Router } from "express";
import avatarController from "./avatar.controller";

const router = Router();

router.get("/public", avatarController.getPublicAvatars);

const avatarRouter = router;
export default avatarRouter;
