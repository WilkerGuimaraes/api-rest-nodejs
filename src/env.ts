import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  PORT: z.number().default(3333),
});

export const env = envSchema.safeParse(process.env);
