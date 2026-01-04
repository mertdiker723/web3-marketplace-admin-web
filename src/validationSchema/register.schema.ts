import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const zodSchema = z
  .object({
    firstName: z.preprocess(
      (val) => (val === null || val === undefined ? '' : val),
      z.string().trim().min(1, 'First Name is required'),
    ),

    lastName: z.preprocess(
      (val) => (val === null || val === undefined ? '' : val),
      z.string().trim().min(1, 'Last Name is required'),
    ),

    email: z.preprocess(
      (val) => (val === null || val === undefined ? '' : val),
      z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
    ),

    password: z.preprocess(
      (val) => (val === null || val === undefined ? '' : val),
      z.string().trim().min(6, 'Password must be at least 6 characters'),
    ),

    confirmPassword: z.preprocess(
      (val) => (val === null || val === undefined ? '' : val),
      z.string().trim().min(6, 'Confirm Password must be at least 6 characters'),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['password'],
  })

export const registerSchema = toTypedSchema(zodSchema)

export type RegisterFormData = z.infer<typeof zodSchema>
