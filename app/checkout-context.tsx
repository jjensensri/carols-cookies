'use client';

import type { WooCommerceData } from '@/types/types';
import React, { createContext, useContext } from 'react';

type CheckoutContextType = {
  data: WooCommerceData | undefined;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({
  children,
  data,
}: {
  children: React.ReactNode;
  data: WooCommerceData | undefined;
}) {
  return <CheckoutContext.Provider value={{ data }}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }

  return {
    cart: context.data?.cart,
    checkout: context.data?.checkout,
  };
}
