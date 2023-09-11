import { createSlice } from '@reduxjs/toolkit';

import {
  fetchContactsThunk,
  addContactThunk,
  deleteContactThunk,
  editContactThunk,
} from './contact-operation';

const contactInitialState = {
  contacts: [],
  editedContact: [],
  isLoading: false,
  error: null,
  showModal: false,
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    openModal(state, action) {
      state.showModal = true;
      state.editedContact = action.payload;
    },
    closeModal(state, _) {
      state.showModal = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContactsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContactsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(addContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.splice(index, 1);
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(editContactThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(editContactThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          contact => contact.id === payload.id
        );
        state.contacts.splice(index, 1, payload);
      })
      .addCase(editContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { openModal, closeModal } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;

export const getContacts = store => store.contacts.contacts;
export const getEditedContact = store => store.contacts.editedContact;
export const isShowModal = store => store.contacts.showModal;