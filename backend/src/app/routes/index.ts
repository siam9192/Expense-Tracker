import { IRouter, Router } from "express";
import authRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";
import countryRouter from "../modules/country/country.route";
import avatarRouter from "../modules/avatar/avatar.route";
import professionRouter from "../modules/profession/profession.router";
import currencyRouter from "../modules/currency/currency.route";

type TModuleRoutes = { path: string; router: IRouter }[];
const router = Router();
const moduleRoutes: TModuleRoutes = [
  {
    path: "/auth",
    router: authRouter,
  },
  {
    path: "/users",
    router: userRouter,
  },
  {
    path: "/avatars",
    router: avatarRouter,
  },
  {
    path: "/countries",
    router: countryRouter,
  },

  {
    path: "/professions",
    router: professionRouter,
  },
  {
    path: "/currencies",
    router: currencyRouter,
  },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;
