import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const zodSchema = z.object({
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

  provinceId: z.number({ invalid_type_error: 'Province is required' }).nullable(),
  districtId: z.number({ invalid_type_error: 'District is required' }).nullable(),
  neighborhoodId: z.number({ invalid_type_error: 'Neighborhood is required' }).nullable(),

  userTypeId: z
    .number({ invalid_type_error: 'User type is required' })
    .nullable()
    .refine((val) => val !== null, { message: 'User type is required' }),

  openAddress: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().trim().optional(),
  ),
})

export const userSchema = toTypedSchema(zodSchema)

export type UserFormData = z.infer<typeof zodSchema>
