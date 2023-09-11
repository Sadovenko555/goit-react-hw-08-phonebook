import { useDispatch, useSelector } from 'react-redux';

import { deleteContactThunk } from 'redux/contacts/contact-operation';
import { getFilter } from 'redux/filter/sliceFilter';
import { getContacts } from 'redux/contacts/contactSlice';
import { openModal } from 'redux/contacts/contactSlice';
import { EditModal } from 'components/EditModal/EditModal';

import { isShowModal } from 'redux/contacts/contactSlice';
import css from 'components/Contacts/Contacts.module.css';
import React from 'react';
import { Notification } from 'components/Notification/Notification';
import { ReactComponent as TrashCan } from '../img/trash.svg';
import { ReactComponent as Pencil } from '../img/pencil.svg';

export const Contacts = ({ children }) => {
  const dispatch = useDispatch();
  const contactsList = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContactsFunc = () => {
    const list = contactsList.filter(contact => {
      const contactWords = contact.name.toLowerCase().split(' ');
      return contactWords.some(word => word.startsWith(filter.toLowerCase()));
    });
    return list;
  };
  const filteredContacts = filteredContactsFunc();

  const isOpen = useSelector(isShowModal);

  return (
    <>
      <section>
        <h2 className={css.title}>Contacts</h2>
        {children}
        {filteredContacts.length > 0 ? (
          <ul>
            {filteredContacts.map(({ id, name, number }) => (
              <li key={id} className={css.item}>
                <span className={css.span}>{name} </span>
                <span className={css.span}>{number}</span>
                <button
                  type="button"
                  className={css.edit}
                  title="Edit"
                  onClick={() => {
                    dispatch(openModal({ id, name, number }));
                  }}
                >
                  <Pencil className={css.icon}></Pencil>
                </button>
                <button
                  type="button"
                  className={css.close}
                  title="Delete"
                  onClick={() => dispatch(deleteContactThunk({ id, name }))}
                >
                  <TrashCan className={css.icon}></TrashCan>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <Notification message="There is no contact"></Notification>
        )}
      </section>
      {isOpen && <EditModal></EditModal>}
    </>
  );
};