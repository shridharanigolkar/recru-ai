import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'


function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <div className='flex w-full'>
         <AppSidebar />
         <SidebarTrigger/>
         <div className='w-full'>
         {children}
         </div>
      </div>
    </SidebarProvider>
  );
}


export default DashboardProvider



