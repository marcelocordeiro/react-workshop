import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  label: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (item: Omit<CartItem, 'quantity'>) => void;
  remove: (id: string) => void;
  clear: () => void;
}

/**
 * A Zustand store: state and the actions that change it, in one object,
 * living OUTSIDE the React tree.
 *
 * Compare with `useContext` (chapter 5):
 *   - No provider to wrap the app in.
 *   - No re-render of every consumer when anything changes — components
 *     subscribe to the exact slice they read.
 *   - Callable from outside React (`useCartStore.getState().clear()`).
 *
 * Backend analogy: a singleton service holding state, which components
 * observe. `set` is the only way in, so mutations stay in one place.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      add: (item) =>
        // `set` receives the current state and returns a PARTIAL update,
        // which is shallow-merged. Same immutability rule as useState:
        // build a new array, never push into the existing one.
        set((state) => {
          const existing = state.items.find(
            (candidate) => candidate.id === item.id,
          );

          if (existing) {
            return {
              items: state.items.map((candidate) =>
                candidate.id === item.id
                  ? { ...candidate, quantity: candidate.quantity + 1 }
                  : candidate,
              ),
            };
          }

          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((candidate) => candidate.id !== id),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      // `persist` middleware mirrors the store into localStorage, so the cart
      // survives a page reload. This is the kind of cross-cutting behaviour
      // you would otherwise hand-roll with useEffect.
      name: 'workshop-cart',
    },
  ),
);
