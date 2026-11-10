import { type Context, Hono } from "hono";
import * as pug from "pug";
import * as path from "node:path"

const viewPath = path.join(process.cwd(), "views");
const getViewPath = (name: string) => path.join(viewPath, `${name}.pug`)
const signupPug = pug.compileFile(getViewPath("signup"));
const menuPug = pug.compileFile(getViewPath("menu"));
const loginPug = pug.compileFile(getViewPath("login"));

function verificarAutenticação(c: Context): boolean {
  return false;
}

export const rotaMenus = new Hono()
  .get("/signup", c => {
    const autenticado: boolean = verificarAutenticação(c);
    if (autenticado) {
      // `c.redirect` já define o status como 302.
      return c.redirect("/");
    }
    
    return c.html(signupPug());
  })
  .get("/", c => {
    const autenticado: boolean = verificarAutenticação(c);
    if (autenticado) {
      return c.html(menuPug());
    }
    return c.render(loginPug());
  })
;
export default rotaMenus;
