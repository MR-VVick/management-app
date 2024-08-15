import React, { useState, useRef, useEffect } from 'react';
import { IconDots, IconEdit, IconTrash } from '@tabler/icons-react';
import { IconEye } from '@tabler/icons-react';

interface ContactProps {
    avatarUrl: string;
    name: string;
    onEdit: () => void;
    onDelete: () => void;
    onView?: () => void;
}

const Contact: React.FC<ContactProps> = ({ avatarUrl, name, onEdit, onDelete, onView }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
            setIsTooltipVisible(false);
        }
    };

    useEffect(() => {
        if (isTooltipVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isTooltipVisible]);

    const toggleTooltip = () => {
        setIsTooltipVisible((prev) => !prev);
    };

    return (
        <div className='relative flex items-center p-4 border-b border-slate-600 rounded-t-lg bg-black'>
            <img
                src={avatarUrl}
                alt="Avatar"
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
                <p className="text-lg font-semibold text-white">{name}</p>
            </div>
            {onView && (
                <IconEye
                    className="text-white cursor-pointer mr-2"
                    onClick={onView}
                    size={20}
                />
            )}
            <div ref={tooltipRef} className="relative">
                <IconDots className="text-white cursor-pointer" onClick={toggleTooltip} />
                {isTooltipVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-black border border-slate-600 rounded-lg shadow-lg z-10">
                        <ul className="p-2">
                            <li>
                                <button
                                    onClick={onEdit}
                                    className="flex items-center p-2 hover:bg-gray-700 w-full text-white"
                                >
                                    <IconEdit className="mr-2" color='white'/>
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={onDelete}
                                    className="flex items-center p-2 hover:bg-gray-700 w-full text-white"
                                >
                                    <IconTrash className="mr-2" color='white'/>
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Contact;
