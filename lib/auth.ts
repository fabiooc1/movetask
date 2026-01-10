import { PrismaClient } from "@/src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        nextCookies()
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
});