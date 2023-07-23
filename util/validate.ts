import { z } from "zod"

export const validate = async <T extends z.Schema>(
  schema: T,
  data: unknown,
) => {
  const valid = await schema.safeParseAsync(data)
  if (!valid.success) {
    console.log(valid.error)
  }
}
