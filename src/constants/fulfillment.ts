import type { Ionicons } from '@expo/vector-icons';

export type FulfillmentMethod = 'delivery' | 'pickup' | 'eatin';

export interface FulfillmentMethodInfo {
  id: FulfillmentMethod;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  /** Shown both in the Home "how it works" section and as the active caption in the checkout picker. */
  description: string;
  /** Shown in the order-placed confirmation once checkout is complete. */
  confirmation: string;
}

export const FULFILLMENT_METHODS: FulfillmentMethodInfo[] = [
  {
    id: 'delivery',
    label: 'Delivery',
    icon: 'bicycle-outline',
    description: 'We bring your order straight to your address, usually within 25–40 minutes.',
    confirmation: 'It will be delivered to your address in 25–40 min.',
  },
  {
    id: 'pickup',
    label: 'Pickup',
    icon: 'bag-handle-outline',
    description: 'Order ahead and grab it yourself at the counter — ready in about 15 minutes.',
    confirmation: 'It will be ready for pickup at the counter in ~15 min.',
  },
  {
    id: 'eatin',
    label: 'Eat in',
    icon: 'restaurant-outline',
    description: 'Reserve a table and enjoy your order fresh, right here — no delivery wait.',
    confirmation: "You're set for table service — no reservation needed.",
  },
];
