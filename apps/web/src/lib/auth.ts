"use client";

import { createAuthClient } from "better-auth/react";

import { jwtClient } from "better-auth/client/plugins";

import { env } from "@/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL,
  plugins: [jwtClient()],
});

export type Session = typeof authClient.$Infer.Session;
