import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const fetchContacts = async () => {
  const request = await axios
    .get('/contacts')
    .catch(e => console.log(e.request.response));
  return request;
};

const addContact = async contact => {
  return await axios
    .post('/contacts', contact)
    .catch(e => console.log(e.request.response));
};

const deleteContactsById = async contactId => {
  return await axios
    .delete(`/contacts/${contactId}`)
    .catch(e => console.log(e.request.response));
};
const editContactsById = async ({ id, name, number }) => {
  return await axios
    .patch(`/contacts/${id}`, { name, number })
    .catch(e => console.log(e.request.response));
};

const registerNewUser = async newUser => {
  return await axios
    .post('/users/signup', newUser)
    .catch(e => console.log(e.request.response));
};

const refreshCurrentUser = async () => {
  return await axios
    .get('/users/current')
    .catch(e => console.log(e.request.response));
};
const logOutUser = async () => {
  return await axios
    .post('/users/logout')
    .catch(e => console.log(e.request.response));
};

const logInUser = async user => {
  return await axios
    .post('/users/login', user)
    .catch(e => console.log(e.request.response));
};

export {
  fetchContacts,
  addContact,
  deleteContactsById,
  editContactsById,
  registerNewUser,
  refreshCurrentUser,
  logOutUser,
  logInUser,
};