'use client';

import { useCheckout } from '@app/checkout-context';

import styles from './checkout-form-summary.module.scss';

export const CheckoutFormSummary = () => {
  const { checkout } = useCheckout();

  return (
    <div className={`${styles['form-summary']} info-panel`}>
      <table>
        <tbody>
          <tr>
            <td>Email</td>
            <td>{checkout?.email}</td>
            <td>
              <a href="https://carolscookies.com/checkout/#shipping">Change</a>
            </td>
          </tr>
          <tr>
            <td>Billing Phone</td>
            <td>{checkout?.billingPhone}</td>
            <td>
              <a href="https://carolscookies.com/checkout/#shipping">Change</a>
            </td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>
              {checkout?.shippingAddress.company && (
                <>
                  {checkout?.shippingAddress.company}
                  <br />
                </>
              )}
              {checkout?.shippingAddress.firstName} {checkout?.shippingAddress.lastName}
              <br />
              {checkout?.shippingAddress.street1}
              <br />
              {checkout?.shippingAddress.street2 && (
                <>
                  {checkout?.shippingAddress.street2}
                  <br />
                </>
              )}
              {checkout?.shippingAddress.city}, {checkout?.shippingAddress.state}{' '}
              {checkout?.shippingAddress.zip}
              <br />
              {checkout?.shippingAddress.country}
            </td>
            <td>
              <a href="https://carolscookies.com/checkout/#shipping">Change</a>
            </td>
          </tr>
          <tr>
            <td>Shipping Phone</td>
            <td>{checkout?.billingPhone}</td>
            <td>
              <a href="https://carolscookies.com/checkout/#shipping">Change</a>
            </td>
          </tr>
          <tr>
            <td>Billing</td>
            <td>
              {checkout?.billingAddress.company && (
                <>
                  {checkout?.billingAddress.company}
                  <br />
                </>
              )}
              {checkout?.billingAddress.street1}
              <br />
              {checkout?.billingAddress.street2 && (
                <>
                  {checkout?.billingAddress.street2}
                  <br />
                </>
              )}
              {checkout?.billingAddress.city}, {checkout?.billingAddress.state}{' '}
              {checkout?.billingAddress.zip}
              <br />
              {checkout?.billingAddress.country}
            </td>
            <td>
              <a href="https://carolscookies.com/checkout">Change</a>
            </td>
          </tr>
          <tr>
            <td>Method</td>
            <td>{checkout?.shippingMethod}</td>
            <td>
              <a href="https://carolscookies.com/checkout">Change</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CheckoutFormSummary;
