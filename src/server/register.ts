import { createServerFn } from '@tanstack/react-start'
import { createUser } from './auth'

export const registerUser = createServerFn({
  method: 'POST',
})
  .validator(
    (data: { name: string; email: string; password: string }) => data,
  )
  .handler(async ({ data }) => {
    return await createUser(
      data.name,
      data.email,
      data.password,
    )
  })