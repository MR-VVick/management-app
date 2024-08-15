import React, { useEffect, useState } from 'react';

interface CreateContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: IContact) => void;
    onEdit: (data: IContact) => void;
    editingContact?: IContact | null;
    length: number;
}

const CreateContactModal: React.FC<CreateContactModalProps> = ({
    isOpen,
    onClose,
    onCreate,
    onEdit,
    editingContact,
    length
}) => {
    const [firstName, setFirstName] = useState(editingContact?.firstName || '');
    const [lastName, setLastName] = useState(editingContact?.lastName || '');
    const [status, setStatus] = useState(editingContact?.status || 'active');

    useEffect(() => {
        if (editingContact) {
            setFirstName(editingContact.firstName);
            setLastName(editingContact.lastName);
            setStatus(editingContact.status);
        } else {
            // Reset fields when in create mode
            setFirstName('');
            setLastName('');
            setStatus('active');
        }
    }, [editingContact]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const contactData: IContact = {
            id: editingContact ? editingContact.id : length + 1,
            firstName,
            lastName,
            status,
        };

        if (editingContact) {
            onEdit(contactData);
        } else {
            onCreate(contactData);
        }

        setFirstName('');
        setLastName('');
        setStatus('active');
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30 z-50">
            <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md mx-8">
                <h2 className="text-xl font-semibold mb-4 text-white">
                    {editingContact ? 'Edit Contact' : 'Create Contact'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-500">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter first name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-500">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Enter last name"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="active"
                                name="status"
                                value="active"
                                checked={status === 'active'}
                                onChange={() => setStatus('active')}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="active" className="ml-2 block text-sm text-gray-500">Active</label>
                        </div>
                        <div className="flex items-center mt-2">
                            <input
                                type="radio"
                                id="inactive"
                                name="status"
                                value="inactive"
                                checked={status === 'inactive'}
                                onChange={() => setStatus('inactive')}
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="inactive" className="ml-2 block text-sm text-gray-500">Inactive</label>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            {editingContact ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateContactModal;
