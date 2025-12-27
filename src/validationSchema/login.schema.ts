import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const zodSchema = z.object({
  email: z
    .preprocess((val) => val ?? '', z.string())
    .pipe(
      z
        .string()
        .min(1, 'Email is required')
        .refine((val) => emailRegex.test(val), {
          message: 'Please enter a valid email address',
        }),
    ),
  password: z
    .preprocess((val) => val ?? '', z.string())
    .pipe(z.string().min(6, 'Password must be at least 6 characters')),
})

export const loginSchema = toTypedSchema(zodSchema)

export type LoginFormData = z.infer<typeof zodSchema>
