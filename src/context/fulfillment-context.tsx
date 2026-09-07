import { createContext, useContext, useState, type ReactNode } from 'react';

import type { FulfillmentMethod } from '@/constants/fulfillment';

export type { FulfillmentMethod };

interface FulfillmentContextValue {
  method: FulfillmentMethod;
  setMethod: (method: FulfillmentMethod) => void;
}

const FulfillmentContext = createContext<FulfillmentContextValue | null>(null);

/** One fulfillment choice shared across every section, so it stays consistent from Home through Cart/checkout. */
export function FulfillmentProvider({ children }: { children: ReactNode }) {
  const [method, setMethod] = useState<FulfillmentMethod>('delivery');
  return <FulfillmentContext.Provider value={{ method, setMethod }}>{children}</FulfillmentContext.Provider>;
}

export function useFulfillment() {
  const ctx = useContext(FulfillmentContext);
  if (!ctx) throw new Error('useFulfillment must be used within a FulfillmentProvider');
  return ctx;
}
