import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  weight?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  sessionId: string;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

function generateSessionId(): string {
  return "rc_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      sessionId: generateSessionId(),

      addItem: (item) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId && i.variant === item.variant);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, id: Date.now() }] });
        }
        set({ isOpen: true });
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) {
          set({ items: get().items.filter((i) => i.id !== id) });
        } else {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "myth-cocoa-cart",
      partialize: (state) => ({
        items: state.items,
        sessionId: state.sessionId,
      }),
    }
  )
);
