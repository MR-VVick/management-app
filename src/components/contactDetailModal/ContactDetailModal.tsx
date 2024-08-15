import React from 'react';
import { IconX } from '@tabler/icons-react';

interface ContactDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    contact: IContact | null;
}

const ContactDetailsModal: React.FC<ContactDetailsModalProps> = ({ isOpen, onClose, contact }) => {
    if (!isOpen || !contact) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md mx-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-white">Contact Details</h2>
                    <IconX
                        onClick={onClose}
                        className="cursor-pointer text-white"
                        size={24}
                    />
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">First Name</p>
                    <p className="text-lg text-gray-700">{contact.firstName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Last Name</p>
                    <p className="text-lg text-gray-700">{contact.lastName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <span
                        className={`inline-block px-3 py-1 rounded-full text-white ${
                            contact.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                    >
                        {contact.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ContactDetailsModal;
