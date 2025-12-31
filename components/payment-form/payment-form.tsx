'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useCheckout } from '@app/checkout-context';

import styles from './payment-form.module.scss';

const { NEXT_PUBLIC_SHIPPING_URL } = process.env;

// todo: move this to server actions
const apiKey = process.env.RUN_API_KEY;

export const PaymentForm = () => {
  const { cart, checkout } = useCheckout();

  const [runnerLoaded, setRunnerLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const nameOnCard = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      // @ts-ignore
      const runner = new Runner();

      // @ts-ignore
      runner.init({
        element: '#run-form',
        publicKey: process.env.NEXT_PUBLIC_RUN_PUBLIC_KEY,
        mid: process.env.NEXT_PUBLIC_RUN_MID,
        useExpiry: true,
        useCvv: true,
        cardLabel: 'Card Number *',
        cvvLabel: 'Card code *',
        expiryLabel: 'Card Expiration *',
        cardPlaceholder: 'Card Number',
        cvvPlaceholder: 'CVC',
        css: {
          input: {
            width: 'calc(100%25 - 26px)',
            border: '1px solid #96bde2',
            'border-radius': '4px',
            'font-size': '16px',
            'font-family': 'sans-serif',
            padding: '14px 12px',
            'margin-top': '6px',
            'margin-bottom': '20px',
          },
          select: {
            width: 'calc(50%25 - 15px)',
            height: '48px',
            border: '1px solid #96bde2',
            'border-radius': '4px',
            'font-size': '16px',
            'font-family': 'sans-serif',
            padding: '14px 12px',
            'margin-top': '6px',
            'margin-bottom': '20px',
          },
          label: {
            'font-size': '14px',
            'font-family': 'sans-serif',
          },
        },
      });

      runner.onLoaded(() => {
        console.log('runner loaded');
        setRunnerLoaded(true);
      });

      document.getElementById('pay-button')?.addEventListener('click', () => {
        setErrorMessage('');
        setSuccessMessage('');
        setLoading(true);

        // @ts-ignore
        runner.tokenize(async (res) => {
          const url = 'https://javelin.runpayments.io/api/v1/charge';
          const options = {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: cart?.total,
              name: nameOnCard.current?.value,
              company_name: checkout?.billingAddress.company,
              email: '',
              phone: checkout?.billingPhone,
              address1: checkout?.billingAddress.street1,
              address2: checkout?.billingAddress.street2,
              address_city: checkout?.billingAddress.city,
              address_state: checkout?.billingAddress.state,
              account_zip: checkout?.billingAddress.zip,
              address_country: checkout?.billingAddress.country,
              order_id: cart?.woocommerce_cart_hash,
              capture: 'Y',
              mid: process.env.NEXT_PUBLIC_RUN_MID,
              account_token: res.account_token,
              expiration: res.expiry,
            }),
          };
          try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log('charge response: ', data);

            if (data['trans_id']) {
              setSuccessMessage(data['trans_id']);
              setLoading(false);

              // TODO: hit webhook and send user back to WOOCOMMERCE ORDER CONFIRMATION PAGE...
              //       ...talk to sergio about what he needs for this.
            } else {
              setErrorMessage(
                typeof data === 'object'
                  ? (data && data.error) ||
                      Object.keys(data)
                        .map((k) => data[k].join(' '))
                        .join(' ')
                  : JSON.stringify(data)
              );
              setLoading(false);
            }
          } catch (error: any) {
            console.error(error);
            setErrorMessage(
              typeof error === 'object'
                ? (error && error.error) ||
                    Object.keys(error)
                      .map((k) => error[k].join(' '))
                      .join(' ')
                : JSON.stringify(error)
            );
            setLoading(false);
          }
        });
      });
    };

    window.addEventListener('load', handleLoad);

    return () => window.removeEventListener('load', handleLoad);
  }, []); // empty array ensures the effect only runs once

  return (
    <div className={`info-panel ${styles['payment-form']}`}>
      <h2>Your Payment Information</h2>
      <p>All transactions are secure and encrypted.</p>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <div className={styles['form-container']}>
        <div className={styles['accepted-cards']}>
          <Image src="/images/visa.svg" width={32} height={20} alt="VISA logo" />
          <Image src="/images/mastercard.svg" width={32} height={20} alt="Mastercard logo" />
          <Image src="/images/discover.svg" width={32} height={20} alt="Discover logo" />
          <Image src="/images/amex.svg" width={32} height={20} alt="American Express logo" />
        </div>
        <form className={styles['run-form']}>
          <div className={styles['input-group']}>
            <label htmlFor="card-name">Name on Card *</label>
            <input id="card-name" type="text" placeholder="Name on Card" ref={nameOnCard} />
          </div>
          <div id="run-form"></div>
        </form>
      </div>
      <p className={styles.note}>
        Your personal data will be used to process your order, support your experience throughout
        this website, and for other purposes described in our
        <a href="https://carolscookies.com/privacy-policy/" target="_blank">
          privacy policy
        </a>
        .
      </p>
      <Button className={styles['pay-button']} id="pay-button" disabled={!runnerLoaded}>
        {loading ? <Spinner animation="border" variant="light" /> : 'Place Order Now'}
      </Button>
      <a href={NEXT_PUBLIC_SHIPPING_URL} className={styles['return-to-shipping']}>
        &laquo; Return to Shipping
      </a>
    </div>
  );
};

export default PaymentForm;
