import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from './contactPage.actionTypes';

export const addContact = (contact: IContact): AddContactAction => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const editContact = (contact: IContact): EditContactAction => ({
  type: EDIT_CONTACT,
  payload: contact,
});

export const deleteContact = (contactId: number): DeleteContactAction => ({
  type: DELETE_CONTACT,
  payload: contactId,
});
