import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const zodSchema = z.object({
  categoryName: z.preprocess(
    (val) => (val === null || val === undefined ? '' : val),
    z.string().trim().min(1, 'Category Name is required'),
  ),
})

export const categorySchema = toTypedSchema(zodSchema)

export type CategoryFormData = z.infer<typeof zodSchema>
