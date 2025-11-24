import { IRouter, Router } from "express";
import authRouter from "../modules/auth/auth.route";
import userRouter from "../modules/user/user.route";
import countryRouter from "../modules/country/country.route";
import avatarRouter from "../modules/avatar/avatar.route";
import professionRouter from "../modules/profession/profession.router";
import currencyRouter from "../modules/currency/currency.route";
import categoryRouter from "../modules/category/category.route";
import goalRouter from "../modules/goal/goal.route";
import transitionRouter from "../modules/transaction/transaction.route";
import notificationRouter from "../modules/notification/notification.route";
import metadataRouter from "../modules/metadata/metadata.route";

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
    path: "/categories",
    router: categoryRouter,
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
  {
    path: "/goals",
    router: goalRouter,
  },
  {
    path: "/transactions",
    router: transitionRouter,
  },
  {
    path: "/notifications",
    router: notificationRouter,
  },
  {
    path: "/metadata",
    router: metadataRouter,
  },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;
