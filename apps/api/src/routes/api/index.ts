import { Hono } from "hono";
import { auth } from "../../lib/auth";
import { apiV1 } from "./v1";

export const api = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

api.on(["POST", "GET"], "/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// Protected routes
api.get("/me", (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);
  return c.json({ user });
});

api.route("v1", apiV1);
