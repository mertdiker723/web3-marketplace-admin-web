import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const zodSchema = z.object({
  email: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().trim().min(1, 'Email is required').email('Please enter a valid email address'),
  ),

  password: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().trim().min(6, 'Password must be at least 6 characters'),
  ),
})

export const loginSchema = toTypedSchema(zodSchema)

export type LoginFormData = z.infer<typeof zodSchema>
