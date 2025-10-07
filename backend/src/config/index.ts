import 'dotenv/config'
import z from 'zod'

// Define schema for environment variables
const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z
        .string()
        .transform((val) => parseInt(val, 10))
        .refine((val) => !isNaN(val), { message: 'PORT must be a number' })
        .default(5000)
        .transform(Number),
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    CORS_ORIGIN: z.string().min(1, 'CORS_ORIGIN is required').default('http://localhost:5173'),
})

// Parse and validate process.env
const parsedEnv = envSchema.parse(process.env)


export const env = {
    NODE_ENV: parsedEnv.NODE_ENV,
    PORT: parsedEnv.PORT,
    DATABASE_URL: parsedEnv.DATABASE_URL,
    CORS_ORIGIN: parsedEnv.CORS_ORIGIN,
}
