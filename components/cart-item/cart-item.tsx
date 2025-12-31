import type { CartItem as CartItemType } from '@/types/types';
import { getFormattedPrice } from '@/utils/utils';
import styles from './cart-item.module.scss';

const { NEXT_PUBLIC_SHIPPING_URL } = process.env;

export const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
        <span className={styles.qty}>{item.quantity}</span>
      </div>
      <div className={styles.name}>
        {item.name}
        <a href={NEXT_PUBLIC_SHIPPING_URL}>Update Item</a>
      </div>
      <div className={styles.price}>{getFormattedPrice(item.price)}</div>
    </div>
  );
};

export default CartItem;
