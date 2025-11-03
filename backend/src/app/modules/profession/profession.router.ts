import { Router } from "express";
import professionController from "./profession.controller";

const router = Router();

router.get("/public", professionController.getPublicProfessions);

const professionRouter = router;
export default professionRouter;
