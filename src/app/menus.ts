import { type Context, Hono } from "hono";
import * as pug from "pug";
import * as path from "node:path"
import { tailwind } from "hono-tailwind";

const viewPath = path.join(process.cwd(), "views");
const getViewPath = (name: string) => path.join(viewPath, `${name}.pug`);
const getRenderFunction =
  process.env.NODE_ENV === "development"
  ? pug.compileFile
  : (path: string, options?: pug.Options) => ((locals?: pug.LocalsObject) => pug.renderFile(path, { ...options, ...locals })) satisfies pug.compileTemplate;
const signupPug = getRenderFunction(getViewPath("signup"));
const menuPug = getRenderFunction(getViewPath("menu"));
const loginPug = getRenderFunction(getViewPath("login"));

function verificarAutenticação(c: Context): boolean {
  return false;
}

export const rotaMenus = new Hono()
  .use("/tailwind.css", tailwind())
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
    return c.html(loginPug());
  })
;
export default rotaMenus;
