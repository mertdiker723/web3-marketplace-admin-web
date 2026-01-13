import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const zodSchema = z.object({
  brandName: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().trim().min(1, 'Brand Name is required'),
  ),
})

export const brandSchema = toTypedSchema(zodSchema)

export type BrandFormData = z.infer<typeof zodSchema>
