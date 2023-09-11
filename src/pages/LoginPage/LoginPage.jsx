import css from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logIn } from 'redux/auth/auth-operation';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message:
        'Please enter a valid email address, for example, example@example.com',
    })
    .required(
      'Please enter a valid email address, for example, example@example.com'
    ),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const { pathname } = useLocation();
  const initialValue = { email: '', password: '' };

  const dispatch = useDispatch();

  const handleSubmit = (user, { resetForm }) => {
    dispatch(logIn(user));
    resetForm();
  };

  return (
    <div
      className={pathname === '/logIn' ? css['container-login'] : css.container}
    >
      <h2 className={css.title}>Let's begin! Please log in</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css['input-form']} autoComplete="off">
          <label className={css['input-item']}>
            Email
            <Field placeholder="Email" type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </label>
          <label className={css['input-item']}>
            Password
            <Field placeholder="Password" type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </label>
          <button className={css['button-form']} type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span> LOGIN
          </button>
          <Link to="/register" className={css.link}>
            Don't have an account? Sign Up
          </Link>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;