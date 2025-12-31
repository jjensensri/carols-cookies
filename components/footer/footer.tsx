import styles from './footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.links}>
          <a
            href="https://www.carolscookies.com/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy Policy
          </a>
          <a
            href="https://www.carolscookies.com/terms-of-use"
            target="_blank"
            rel="noreferrer noopener"
          >
            Terms of Use
          </a>
          <a
            href="https://www.carolscookies.com/refund-returns/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Refund Policy
          </a>
          <a
            href="https://www.carolscookies.com/contact-us"
            target="_blank"
            rel="noreferrer noopener"
          >
            Contact Us
          </a>
        </div>
        <div className={styles.copyright}>© {new Date().getFullYear()}. All rights reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
