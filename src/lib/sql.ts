import { SQL } from "bun";

const sql = new SQL({
  adapter: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS
});

export default sql;
