import { createServerFn } from '@tanstack/react-start'
import { db } from '../db'
import { products } from '../db/schema'
import { desc, eq, like, or } from 'drizzle-orm'

import { getRequest } from '@tanstack/react-start/server'
import { getSession } from 'start-authjs'
import { authConfig } from '../utils/auth'

export const getProducts = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db.select().from(products)
})

export const getProductById = createServerFn({
  method: 'GET',
})
  .validator(
    (data: {
      id: number
    }) => data,
  )
  .handler(async ({ data }) => {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, data.id))
      .limit(1)

    return product ?? null
  })

export const createProduct = createServerFn({
  method: 'POST',
})
  .validator(
    (data: {
      name: string
      description: string
      price: number
      stock: number
      image: string
    }) => data,
  )
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await getSession(request, authConfig)

    if (!session?.user) {
      throw new Error('Unauthorized')
    }
    const now = new Date()

    const [product] = await db
      .insert(products)
      .values({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        image: data.image,
        createdAt: now,
        updatedAt: now,
      })
      .returning()

    return product
  })

export const getFeaturedProducts = createServerFn({
  method: 'GET',
}).handler(async () => {
  return await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(3)
})

export const searchProducts = createServerFn({
  method: 'GET',
})
  .validator((data: { query: string }) => data)
  .handler(async ({ data }) => {
    const query = data.query.trim()

    if (!query) {
      return []
    }

    const searchPattern = `%${query}%`

    return await db
      .select()
      .from(products)
      .where(
        or(
          like(products.name, searchPattern),
          like(products.description, searchPattern),
          like(products.price, searchPattern),
        ),
      )
      .orderBy(desc(products.createdAt))
  })
