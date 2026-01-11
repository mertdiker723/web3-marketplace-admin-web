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

    phone: z.preprocess(
      (val) => (val === null || val === undefined || val === '' ? '' : val),
      z
        .string()
        .trim()
        .optional()
        .refine(
          (val) => !val || /^\d{10,15}$/.test(val),
          'Phone number must be between 10 and 15 digits',
        ),
    ),

    password: z.preprocess(
      (val) => (val === null || val === undefined || val === '' ? '' : val),
      z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || val.length >= 6, 'Password must be at least 6 characters'),
    ),

    confirmPassword: z.preprocess(
      (val) => (val === null || val === undefined || val === '' ? '' : val),
      z
        .string()
        .trim()
        .optional()
        .refine((val) => !val || val.length >= 6, 'Confirm Password must be at least 6 characters'),
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
export const profileSchema = toTypedSchema(zodSchema)

export type ProfileFormData = z.infer<typeof zodSchema>
