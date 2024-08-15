import React, { useState } from 'react';
import { MENU_ITEMS } from './data';
import { Link, useLocation } from 'react-router-dom';
import { IconMenu2 } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

interface SideNavProps {
    title?: string;
    children?: React.ReactNode;
}


const SideNav: React.FC<SideNavProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const path = useLocation();

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex-1 flex'>
            <div  className={`px-4 fixed top-0 left-0 h-full w-64 bg-black border-r border-slate-600 transform transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 md:relative md:flex md:flex-col md:w-64 z-50`}>
                <div className="overflow-y-auto h-full grid grid-rows-[auto_1fr_auto] grid-cols-1">
                    <div className="flex justify-end p-[24px_3px_30px_0px]">
                        {/* <img className="h-[1.375rem] w-[6.2rem]" src={logo} alt="logo" /> */}
                        <button
                            className="md:hidden text-white"
                            onClick={toggleDrawer}
                        >
                            <IconX size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        {MENU_ITEMS.map((item: any) => (
                            <Link key={item.link} to={item.link} className="no-underline">
                                <div 
                                    className={`flex justify-start items-center h-12 px-4 gap-3 rounded-lg ${path.pathname === item.link ? "bg-gray-700" : ""} hover:bg-gray-700 cursor-pointer`}>
                                    {item.icon}
                                    <div className='text-white'>{item.label}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-1 h-full bg-black'>
                <div className='flex-1 flex items-center px-4 h-14'>
                    <button
                        className="md:hidden p-4 text-white"
                        onClick={toggleDrawer}
                    >
                        <IconMenu2 size={24} />
                    </button>
                    <p className='text-lg font-semibold text-white'>{title}</p>
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default SideNav;
