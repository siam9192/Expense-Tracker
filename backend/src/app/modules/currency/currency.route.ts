import { Router } from "express";
import currencyController from "./currency.controller";

const router = Router();

router.get("/public", currencyController.getPublicCurrencies);

const currencyRouter = router;

export default currencyRouter;
