import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'
import argon2 from 'argon2'

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  })
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  const hashedPassword = await argon2.hash(password)

  const id = crypto.randomUUID()

  const [user] = await db
    .insert(users)
    .values({
      id,
      name,
      email,
      password: hashedPassword,
    })
    .returning()

  return user
}

export async function verifyUserPassword(
  email: string,
  password: string,
) {
  const user = await getUserByEmail(email)

  if (!user || !user.password) {
    return null
  }

  const isValid = await argon2.verify(user.password, password)

  if (!isValid) {
    return null
  }

  return user
}
