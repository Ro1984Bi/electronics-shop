import { db } from './index'
import { users } from './schema'

const result = await db.select().from(users)

console.log(result)