import { Hono } from "hono";
import { auth } from "../../lib/auth";

export const apiV1 = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

apiV1.get("/", (c) => c.text("Hello from Api V1"));
