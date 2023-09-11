import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from 'redux/auth/auth-operation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import css from './SignUpPage.module.css';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇ]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ])?[a-zA-Zа-яА-ЯіІєЄїЇ]*)*$/,
      {
        message:
          "Name may contain only letters, apostrophe, dash and spaces",
      }
    )
    .required(
      "Name may contain only letters, apostrophe, dash and spaces."
    ),
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

const SignUpPage = () => {
  const initialValue = { email: '', name: '', password: '' };

  const dispatch = useDispatch();

  const handleSubmit = (newUser, { resetForm }) => {
    dispatch(register(newUser));
    resetForm();
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Sign up to proceed, please</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css['input-form']} autoComplete="off">
          <label className={css['input-item']}>
            Name
            <Field placeholder="Name" type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </label>
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
            <span></span> REGISTER
          </button>
          <Link to="/logIn" className={css.link}>
            Already have an account? Sign in
          </Link>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpPage;