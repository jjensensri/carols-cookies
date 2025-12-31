import styles from './checkout-steps.module.scss';

const { MAIN_CHECKOUT_URL, SHIPPING_URL } = process.env;

export const CheckoutSteps = () => {
  return (
    <ul className={styles['checkout-steps']}>
      <li>
        <a href={MAIN_CHECKOUT_URL}>Information</a>
      </li>
      <li>
        <a href={SHIPPING_URL}>Shipping</a>
      </li>
      <li className="active">
        <a href="javascript:void(0)">Payment</a>
      </li>
    </ul>
  );
};

export default CheckoutSteps;
