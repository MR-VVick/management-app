import { IconUser } from "@tabler/icons-react";
import { IconMap } from "@tabler/icons-react";
import React from "react";

export interface MenuItem {
    key: number
    link: string;
    icon: React.ReactNode;
    label: string;
}

export const MENU_ITEMS: MenuItem[] = [
    {
        key: 1,
        label: 'Contacts',
        icon: <IconUser color='white'/>,
        link: '/'
    },
    {
        key: 2,
        label: 'Charts & Maps',
        icon: <IconMap color='white'/>,
        link: '/charts-maps'
    },
]