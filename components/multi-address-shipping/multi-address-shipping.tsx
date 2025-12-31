import styles from './multi-address-shipping.module.scss';

export const MultiAddressShipping = () => {
  return (
    <div className={styles['multi-address-shipping']}>
      To ship your order to 10 or more addresses, please{' '}
      <a href="https://carolscookies.com/wp-content/uploads/2020/12/order-spreadsheet-template.xls">
        use this form
      </a>{' '}
      and email us directly at{' '}
      <a href="mailto:order@carolscookies.com" target="_blank">
        order@carolscookies.com
      </a>
      . An associate will contact you shortly.
    </div>
  );
};

export default MultiAddressShipping;
