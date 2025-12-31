export type Address = {
  company?: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type ShippingAddress = Address & {
  firstName: string;
  lastName: string;
};

export type CartItem = {
  image: string;
  name: string;
  quantity: number;
  price: number;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  estimatedShipping: number;
  total: number;
  woocommerce_cart_hash: string; // from cookie called "woocommerce_cart_hash"
};

export type Checkout = {
  email: string;
  billingPhone: string;
  shippingAddress: ShippingAddress;
  shippingPhone: string;
  billingAddress: Address;
  shippingMethod: string;
};

export type WooCommerceData = {
  cart: Cart;
  checkout: Checkout;
};

export type RunnerTokenizeResponse = {
  hasToken: boolean;
  token: string;
  expiration: string;
};

export type RunnerChargeResponse = {
  account_token: string | null;
  account_zip: string | null;
  address1: string | null;
  address2: string | null;
  amount: string | null; // number | null
  auth_code: string | null;
  authcode: string | null;
  avs_resp: string | null;
  batch_id: string | null;
  bin_info: string | null;
  bin_type: string | null;
  card_brand: string | null;
  card_number: string | null;
  card_type: string | null;
  city: string | null;
  cof: string | null;
  comm_card: string | null;
  company_name: string | null;
  country: string | null;
  currency: string | null;
  cvv_resp: string | null;
  decline_category: string | null;
  decline_category_text: string | null;
  email: string | null;
  emv: string | null;
  emv_tag_data: string | null;
  expiration: string | null;
  fee_amount: string | null; // number | null
  fee_authcode: string | null;
  fee_format: string | null;
  fee_mid: string | null;
  fee_txn: string | null;
  fee_type: string | null;
  fee_value: string | null;
  mid: string | null;
  order_id: string | null;
  phone: string | null;
  pos_entry: string | null;
  region: string | null;
  resp_code: string | null;
  resp_proc: string | null;
  resp_text: string | null;
  result: 'A' | 'B' | 'C' | null;
  trans_date: string | null;
  trans_id: string | null;
  user_identifier: string | null;
  vault: string | null;
  vault_holder_id: string | null;
  vault_id: number | null;
  trans_type: string | null;
};
