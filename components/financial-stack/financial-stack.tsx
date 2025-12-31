import { useCheckout } from '@app/checkout-context';
import { getFormattedPrice } from '@/utils/utils';

import styles from './financial-stack.module.scss';

export const FinancialStack = () => {
  const { cart } = useCheckout();

  return (
    <div className={styles['financial-stack']}>
      <div className={styles.line}>
        Subtotal: <span>{getFormattedPrice(cart?.subtotal)}</span>
      </div>
      <div className={styles.line}>
        Estimated Shipping: <span>{getFormattedPrice(cart?.estimatedShipping)}</span>
      </div>
      <div className={`${styles.line} ${styles.total}`}>
        Total: <span>{getFormattedPrice(cart?.total)}</span>
      </div>
    </div>
  );
};

export default FinancialStack;
