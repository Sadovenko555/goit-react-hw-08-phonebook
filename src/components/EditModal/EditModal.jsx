import css from 'components/EditModal/EditModal.module.css';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEditedContact } from 'redux/contacts/contactSlice';
import { getContacts } from 'redux/contacts/contactSlice';
import { closeModal } from 'redux/contacts/contactSlice';
import { Formik, Form, Field } from 'formik';
import { editContactThunk } from 'redux/contacts/contact-operation';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as CLoseButton } from '../img/close-button.svg';

const modalRoot = document.querySelector('#modal-root');

export const EditModal = () => {
  const dispatch = useDispatch();
  const { name, number, id } = useSelector(getEditedContact);
  const contactsList = useSelector(getContacts);
  const initialValue = { name, number };

  useEffect(() => {
    const onEscClick = e => {
      if (e.code === 'Escape') {
        dispatch(closeModal());
      }
    };
    window.addEventListener('keydown', onEscClick);

    return () => {
      window.removeEventListener('keydown', onEscClick);
    };
  }, [dispatch]);

  const onBackdropClick = e => {
    if (e.currentTarget === e.target) {
      dispatch(closeModal());
    }
  };

  const handleSubmit = editedContact => {
    if (
      contactsList.some(contact => {
        return contact.name === editedContact.name;
      })
    ) {
      toast.error(`${editedContact.name} is alredy in Phonebook `);
      return;
    }
    editedContact.id = id;
    dispatch(editContactThunk(editedContact));
    dispatch(closeModal());
  };

  return createPortal(
    <div className={css.Overlay} onClick={onBackdropClick}>
      <div className={css.Modal}>
        <Formik initialValues={initialValue} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <p className={css['form-title']}>Edit contact</p>
            <div className={css['input-container']}>
              <label htmlFor="name" className={css.label}>
                Name
                <Field type="text" name="name" placeholder="Enter email" />
              </label>
            </div>
            <div className={css['input-container']}>
              <label htmlFor="number" className={css.label}>
                Number
                <Field type="tel" name="number" placeholder="Enter password" />
              </label>
            </div>
            <button type="submit" className={css.submit}>
              Change
            </button>
            <button
              className={css.close}
              type="button"
              name="close"
              onClick={() => dispatch(closeModal())}
            >
              <CLoseButton className={css.icon} />
            </button>
          </Form>
        </Formik>
      </div>
    </div>,
    modalRoot
  );
};