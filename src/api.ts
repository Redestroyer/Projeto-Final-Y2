import { Hono } from "hono";

export const rotaAPI = new Hono()
  .get("/", c => {
    return c.text("Rotas definidas: (nenhuma)");
  })
  .all("*", c => {
    return c.redirect("/api");
  })
;
export default rotaAPI;
