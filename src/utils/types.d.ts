interface IContact {
    id: number;
    firstName: string;
    lastName: string;
    status: string;
}
  
type ContactsState = {
    contacts: IContact[];
};
  
type AddContactAction = {
    type: 'ADD_CONTACT';
    payload: IContact;
};

type EditContactAction = {
    type: 'EDIT_CONTACT';
    payload: IContact;
};
  
type DeleteContactAction = {
    type: 'DELETE_CONTACT';
    payload: number;
};
  
type Action = AddContactAction | EditContactAction | DeleteContactAction;
  
type DispatchType = (args: Action) => Action;
  