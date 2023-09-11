import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/contacts/contactSlice';

import { addContactThunk } from 'redux/contacts/contact-operation';

import css from 'components/InputForm/InputForm.module.css';
import { nanoid } from 'nanoid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue = { name: '', number: '' };
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Zа-яА-ЯіІєЄїЇ]+(([' -][a-zA-Zа-яА-ЯіІєЄїЇ])?[a-zA-Zа-яА-ЯіІєЄїЇ]*)*$/,
      {
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
      }
    )
    .required(
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      {
        message:
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
      }
    )
    .required(
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const InputForm = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);
  const loginInputId = nanoid(5);
  const handleSubmit = (newContact, { resetForm }) => {
    if (
      contactsList.some(contact => {
        return contact.name === newContact.name;
      })
    ) {
      toast.error(`${newContact.name} is alredy in Phonebook `);
      return;
    }
    newContact.id = nanoid(5);
    dispatch(addContactThunk(newContact));
    toast.success(`${newContact.name} was added!`);
    resetForm();
  };

  return (
    <section>
      <h2 className={css.title}>Phonebook</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css['input-form']}>
          <label htmlFor={loginInputId} className={css['sub-title']}>
            Name
            <Field
              id={loginInputId}
              type="text"
              name="name"
              placeholder="Enter the contact's name..."
            />
            <ErrorMessage name="name" component="div" />
          </label>

          <label className={css['sub-title']}>
            Number
            <Field
              type="tel"
              name="number"
              placeholder="Enter the contact's number..."
            />
            <ErrorMessage name="number" component="div" />
          </label>
          <button className={css['button-form']} type="submit">  
            Add contact
          </button>
        </Form>
      </Formik>
    </section>
  );
};