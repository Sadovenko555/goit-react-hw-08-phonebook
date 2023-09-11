import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContactsById,
  fetchContacts,
  editContactsById,
} from 'api/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchContactsThunk = createAsyncThunk(
  'contacts/fetchContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await fetchContacts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  'contacts/AddContact',
  async (contact, thunkApi) => {
    try {
      const { data } = await addContact(contact);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/DeleteContact',
  async ({ id: contactId, name: contactName }, thunkApi) => {
    try {
      const { data } = await deleteContactsById(contactId);
      toast.info(`${contactName} was deleted!`);
      return data;
    } catch (error) {
      toast.error(`Something went wrong! ${contactName} was not deleted!`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const editContactThunk = createAsyncThunk(
  'contacts/EditContact',
  async (contact, thunkApi) => {
    try {
      const { data } = await editContactsById(contact);
      toast.info(`${contact.name} was changed!`);
      return data;
    } catch (error) {
      toast.error(
        `Something went wrong! Changes to ${contact.name} were not saved.`
      );
      return thunkApi.rejectWithValue(error.message);
    }
  }
);