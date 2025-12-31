import { Metadata } from 'next';
import { Container } from 'react-bootstrap';
import { CartInfo } from '@components/cart-info';
import { CheckoutFormSummary } from '@components/checkout-form-summary';
import { CheckoutSteps } from '@components/checkout-steps';
import { Login } from '@components/login';
import { MultiAddressShipping } from '@components/multi-address-shipping';
import { PaymentForm } from '@components/payment-form';

export const metadata: Metadata = {
  title: "Checkout | Carol's Cookies",
  description: 'All-Natural, Handmade, Gourmet Cookies',
};

export default async function CheckoutPage(props: { params: Promise<{ handle: string }> }) {
  return (
    <main>
      <Container>
        <div className="checkout">
          <CartInfo />
          <div className="checkout-form">
            <h1>Checkout</h1>
            <MultiAddressShipping />
            <Login />
            <CheckoutSteps />
            <CheckoutFormSummary />
            <PaymentForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
