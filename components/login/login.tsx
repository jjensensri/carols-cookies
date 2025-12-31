import styles from './login.module.scss';

export const Login = () => {
  return (
    <div className={styles['login-button']}>
      <a className="btn btn-primary" href="https://carolscookies.com/checkout">
        Returning customer?
      </a>
    </div>
  );
};

export default Login;
