import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContactsThunk } from 'redux/contacts/contact-operation';

import { InputForm } from 'components/InputForm/InputForm';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

import { ToastContainer } from 'react-toastify';
import css from 'pages/ContactsPage/ContactsPage.module.css';

const ContactPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <div className={css['contact-container']}>
      <InputForm></InputForm>
      <Contacts>
        <Filter></Filter>
      </Contacts>
      <ToastContainer autoClose={3000} theme="dark" />
    </div>
  );
};
export default ContactPage;