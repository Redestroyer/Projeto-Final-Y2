import { Hono } from "hono";
import rotaAPI from "./api";
import rotaMenus from "./menus";

export const app = new Hono()
  .route("/api", rotaAPI)
  .route("/", rotaMenus)
  .notFound(c => c.redirect("/"))
;
export default app;
