import { Router } from "express";
import countryController from "./country.controller";

const router = Router();

router.get("/public", countryController.getPublicCountries);

const countryRouter = router;
export default countryRouter;
