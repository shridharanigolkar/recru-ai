import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { AppSidebar } from './_components/AppSidebar'


function DashboardProvider({ children }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
         <SidebarTrigger/>
          {children}
        
      </div>
    </SidebarProvider>
  );
}


export default DashboardProvider
