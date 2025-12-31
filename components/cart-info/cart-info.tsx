'use client';

import { useState } from 'react';
import { BsCart3, BsChevronDown } from 'react-icons/bs';
import { useCheckout } from '@app/checkout-context';
import { CartItem } from '@components/cart-item';
import { FinancialStack } from '@components/financial-stack';
import type { CartItem as CartItemType } from '@/types/types';
import { getFormattedPrice } from '@/utils/utils';

import styles from './cart-info.module.scss';

const { NEXT_PUBLIC_SHIPPING_URL } = process.env;

export const CartInfo = () => {
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const { cart } = useCheckout();

  const toggleMobileTitle = () => {
    setMobileSummaryOpen(!mobileSummaryOpen);
  };

  return (
    <div className={`info-panel ${styles['cart-info']} ${mobileSummaryOpen ? styles.open : ''}`}>
      <div className={styles['mobile-title']} onClick={toggleMobileTitle}>
        <div className={styles['mobile-toggle']}>
          <BsCart3 /> {mobileSummaryOpen ? 'Hide' : 'Show'} Order Summary{' '}
          <span className={styles.arrow}>
            <BsChevronDown />
          </span>
        </div>
        <div className={styles['mobile-total']}>{getFormattedPrice(cart?.total)}</div>
      </div>
      <div className={styles['cart-content']}>
        <div className={styles.title}>Your Cart</div>
        <div className={styles['cart-items']}>
          {cart?.items.map((item: CartItemType, index: number) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
        <a className="btn btn-primary" href={NEXT_PUBLIC_SHIPPING_URL}>
          Add Coupon
        </a>
        <FinancialStack />
      </div>
    </div>
  );
};

export default CartInfo;
