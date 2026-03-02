import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { auth } from "./lib/auth";
import { env } from "./env";
import { api } from "./routes/api";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use("*", logger());

app.use(
  "*",
  cors({
    origin: (origin) => {
      const trustedOrigins = env.TRUSTED_ORIGINS.split(",").map((o) =>
        o.trim(),
      );
      return trustedOrigins.includes(origin || "") ? origin : null;
    },
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  c.set("user", session?.user ?? null);
  c.set("session", session?.session ?? null);

  await next();
});

app.get("/", (c) => c.text("Hello World From Hono"));

app.route("/api", api);

export default {
  port: 3100,
  fetch: app.fetch,
};
