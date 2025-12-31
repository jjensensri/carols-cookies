import styles from './login.module.scss';

const { NEXT_PUBLIC_MAIN_CHECKOUT_URL } = process.env;

export const Login = () => {
  return (
    <div className={styles['login-button']}>
      <a className="btn btn-primary" href={NEXT_PUBLIC_MAIN_CHECKOUT_URL}>
        Returning customer?
      </a>
    </div>
  );
};

export default Login;
