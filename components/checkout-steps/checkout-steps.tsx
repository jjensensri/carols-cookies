import styles from './checkout-steps.module.scss';

export const CheckoutSteps = () => {
  return (
    <ul className={styles['checkout-steps']}>
      <li>
        <a href="https://carolscookies.com/checkout">Information</a>
      </li>
      <li>
        <a href="https://carolscookies.com/checkout/#shipping">Shipping</a>
      </li>
      <li className="active">
        <a href="javascript:void(0)">Payment</a>
      </li>
    </ul>
  );
};

export default CheckoutSteps;
