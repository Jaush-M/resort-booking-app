import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { customSession, openAPI, jwt } from "better-auth/plugins";

import { db } from "../database/drizzle";
import { getUserPermissions } from "../database/helpers";

import { env } from "../env";

const trustedOrigins = env.TRUSTED_ORIGINS.split(",").map((o) => o.trim());

export const auth = betterAuth({
  baseURL: env.API_URL,
  secret: env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh daily
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 mins
      strategy: "jwe",
    },
  },

  plugins: [
    customSession(async ({ user, session, ...rest }) => {
      const userPermissions = await getUserPermissions(user.id);

      return {
        ...rest,
        session,
        user: {
          ...user,
          permissions: userPermissions,
        },
      };
    }),

    jwt({
      jwks: {
        rotationInterval: 60 * 60 * 24 * 30, // 30 days
        gracePeriod: 60 * 60 * 24 * 15, // 15 days
      },
    }),

    openAPI(),
  ],

  trustedOrigins,

  advanced: {
    defaultCookieAttributes: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  },
});

export type Session = typeof auth.$Infer.Session;
