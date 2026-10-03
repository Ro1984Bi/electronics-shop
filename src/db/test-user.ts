import { createUser } from '../server/auth'

const user = await createUser(
  'Test User',
  'test@example.com',
  'password123',
)

console.log(user)