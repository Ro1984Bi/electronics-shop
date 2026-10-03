import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product, quantity) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity,
              },
            ],
          }
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity,
                }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'electronics-shop-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    },
  ),
)
