import styles from './checkout-steps.module.scss';

const { NEXT_PUBLIC_MAIN_CHECKOUT_URL, NEXT_PUBLIC_SHIPPING_URL } = process.env;

export const CheckoutSteps = () => {
  return (
    <ul className={styles['checkout-steps']}>
      <li>
        <a href={NEXT_PUBLIC_MAIN_CHECKOUT_URL}>Information</a>
      </li>
      <li>
        <a href={NEXT_PUBLIC_SHIPPING_URL}>Shipping</a>
      </li>
      <li className="active">
        <a href="javascript:void(0)">Payment</a>
      </li>
    </ul>
  );
};

export default CheckoutSteps;
