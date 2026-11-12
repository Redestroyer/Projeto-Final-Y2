import app from "./app";

const portNumber = Number(process.env.PORT || "")
const port =
  portNumber
    &&
  (Number.isSafeInteger(portNumber) && portNumber > 0 && portNumber < 65536)
  ? portNumber
  : 3000

export default {
  port,
  fetch: app.fetch
} satisfies Bun.Serve.Options<undefined>;
