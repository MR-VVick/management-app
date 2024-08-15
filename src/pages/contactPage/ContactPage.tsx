import React, { useState } from 'react'
import SideNav from '../../components/sideNav/SideNav'
import { IconPlus } from '@tabler/icons-react'
import CreateContactModal from '../../components/createContactModal/CreateContactModal';
import Contact from '../../components/contact/Contact';
import { useDispatch } from 'react-redux';
import { addContact, deleteContact, editContact } from './contactPage.actions';
import { useSelector } from 'react-redux';
import ContactDetailsModal from '../../components/contactDetailsModal/ContactDetailsModal';

const ContactPage: React.FC = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<IContact | null>(null);
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
    const dispatch = useDispatch();
    const contacts = useSelector((state: ContactsState) => state.contacts || []);
  
    const handleCreate = (contact: IContact) => {
        dispatch(addContact(contact));
        setModalOpen(false);
        setEditingContact(null);
    };

    const handleEdit = (contact: IContact) => {
        dispatch(editContact(contact));
    };

    const handleDelete = (id: number) => {
        dispatch(deleteContact(id));
    };

    return (
        <div className="flex h-screen">
            <SideNav title="Contacts">
                <div className="py-8 px-6">
                    <div className="flex-1 flex justify-center items-center">      
                        <div className=" w-64 flex justify-between items-center h-12 px-4 gap-3 rounded-lg bg-blue-600 text-white cursor-pointer" onClick={() => setModalOpen(true)}>
                            <div>Create Contact</div>                   
                            <IconPlus width='20px' height='20px'/>
                        </div>
                    </div>
                    <div className='mt-10'>
                        {contacts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center text-center">
                                <p className="text-lg font-semibold text-gray-700">
                                    No Contact Found. Please add a contact from the "Create Contact" button.
                                </p>
                            </div>
                        ) : (
                            contacts.map((contact) => (
                                <Contact
                                    key={contact.id}
                                    avatarUrl='https://via.placeholder.com/150'
                                    name={`${contact.firstName} ${contact.lastName}`}
                                    onEdit={() => { setModalOpen(true); setEditingContact(contact); }}
                                    onDelete={() => handleDelete(contact.id)}
                                    onView={() => { setSelectedContact(contact); setDetailsModalOpen(true); }}
                                />
                            ))
                        )}
                    </div>
                </div>
            </SideNav>
            <CreateContactModal
                isOpen={isModalOpen}
                onClose={() =>{ setModalOpen(false); setEditingContact(null)}}
                editingContact={editingContact}
                onCreate={handleCreate}
                onEdit={handleEdit}
                length={contacts.length}
            />
            <ContactDetailsModal
                isOpen={isDetailsModalOpen}
                onClose={() => setDetailsModalOpen(false)}
                contact={selectedContact}
            />
        </div>
    )
}

export default ContactPage