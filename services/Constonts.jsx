import { Calendar, LayoutDashboard, List, Settings, WalletCards } from "lucide-react";

export const SideBaroptions = [
    {
        name : 'Dashboard',
        icon: LayoutDashboard,
        path : '/dashboard'
    },
     {
        name : 'Schedule Interview',
        icon:  Calendar,
        path : '/scheduled-interview'
    },
     {
        name : 'All Interview',
        icon:   List,
        path : '/all-interview'
    },
     {
        name : 'Billing',
        icon:  WalletCards,
        path : '/billing'
    },
      {
        name : 'Settings',
        icon:   Settings,
        path : '/settings'
    },

]