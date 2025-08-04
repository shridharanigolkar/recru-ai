import { BriefcaseBusinessIcon, Calendar, Code2Icon, Crown, LayoutDashboard, List, LucideLoader2, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

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
export const InterviewType = [
    {
        title : 'Technical',
        icon : Code2Icon
    },
    {
        title : 'Behavioral',
        icon : User2Icon
    },
    {
        title : 'Experience',
        icon : BriefcaseBusinessIcon
    },
    {
        title : 'Problem Solving',
        icon :   Puzzle
    },
    {
        title : 'Leadership',
        icon : Crown
    },
]