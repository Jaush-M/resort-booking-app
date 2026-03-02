import { loadEnv } from "@repo/core/env";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

loadEnv();

const DEFAULT = {
  APP_NAME: "Resort Booking App",
  WEB_URL: "http://localhost:3000",
  API_URL: "http://localhost:3100",

  MAIL_HOST: "log",
  MAIL_PORT: 465,
  MAIL_ENCRYPT: true,
  MAIL_FROM_ADDRESS: "hello@example.com",
};

const DEFAULT_BETTER_AUTH_URL = DEFAULT.API_URL;
const DEFAULT_TRUSTED_ORIGINS = DEFAULT.WEB_URL;

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    APP_NAME: z.string().default(DEFAULT.APP_NAME),
    WEB_URL: z.string().default(DEFAULT.WEB_URL),
    API_URL: z.string().default(DEFAULT.API_URL),

    DATABASE_URL: z.url(),

    BETTER_AUTH_URL: z.string().default(DEFAULT_BETTER_AUTH_URL),
    BETTER_AUTH_SECRET: z.string(),

    TRUSTED_ORIGINS: z.string().default(DEFAULT_TRUSTED_ORIGINS),

    MAIL_HOST: z.string().default(DEFAULT.MAIL_HOST),
    MAIL_PORT: z.coerce.number().default(DEFAULT.MAIL_PORT),
    MAIL_ENCRYPT: z.coerce.boolean().default(DEFAULT.MAIL_ENCRYPT),
    MAIL_USERNAME: z.string().nullish(),
    MAIL_PASSWORD: z.string().nullish(),
    MAIL_FROM_ADDRESS: z.email().default(DEFAULT.MAIL_FROM_ADDRESS),
    MAIL_FROM_NAME: z.string().default(DEFAULT.APP_NAME),

    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    APP_NAME: process.env.APP_NAME,
    WEB_URL: process.env.WEB_URL,
    API_URL: process.env.API_URL,

    DATABASE_URL: process.env.DATABASE_URL,

    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,

    TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS,

    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_ENCRYPT: process.env.MAIL_ENCRYPT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,

    NODE_ENV: process.env.NODE_ENV,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
