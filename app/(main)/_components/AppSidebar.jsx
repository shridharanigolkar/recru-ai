'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { SideBaroptions } from '@/services/Constonts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


export function AppSidebar() {
  const path = usePathname();
  console.log(path);
  

  return (
    <Sidebar>
      <SidebarHeader className='flex items-center'>
       <Image src ={'/logo.jpeg'} alt ='logo' 
              width={100}
              height={100}
              className='w-[150px]'/>

              <Button className='w-full mt-2'> <Plus/> Create New Interview</Button>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup label="Main">
          <SidebarContent>
           <SidebarMenu>
                {SideBaroptions.map((option, index) => (
                  <SidebarMenuItem key={index} className='p-1 '>
                    <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-50'} `}>
                      <Link href={option.path} className="flex items-center gap-2">
                        <option.icon size={18} className={`${path == option.path && 'text-primary'}`} />
                        <span className={`text-[16px] ${path == option.path && 'text-primary'}`}>{option.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>

          </SidebarContent>
      </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}