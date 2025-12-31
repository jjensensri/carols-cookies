import { FaShieldAlt } from 'react-icons/fa';
import Logo from '@components/icons/logo';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <div className={styles.secure}>
        <FaShieldAlt width={16} height={16} /> SSL Secured Checkout
      </div>
    </header>
  );
};

export default Header;
