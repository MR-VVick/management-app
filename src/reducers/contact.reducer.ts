import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from "../pages/contactPage/contactPage.actionTypes";

const initialState: ContactsState = {
  contacts: [],
};

const reducer = (state: ContactsState = initialState, action: Action): ContactsState => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: Array.isArray(state.contacts) ? [...state.contacts, action.payload] : [action.payload],
      };

    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };

    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
