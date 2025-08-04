import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constonts'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
function FormConatiner({onHandleInputChanges}) {
    const [interviewType,setInterviewType]=useState([]);
    useEffect(()=>{
        if(interviewType){
            onHandleInputChanges('type',interviewType)
        }
    },[interviewType])

    const AddInterviewType = (type) =>{
       const data = interviewType.includes(type);
       if(!data){
        setInterviewType(prev=> [...prev,type]);
       }
       else{
        const result = interviewType.filter(item=>item!=type);
        setInterviewType(result);
       }
    }
  return (
    <div className='p-5 bg-white rounded-2xl' >
      <div>
            <h2 className='text-sm font-medium'>Job position</h2>
            <Input className='mt-2' placeholder="e.g Full Stack Developer"
            onChange={(e)=>onHandleInputChanges('jobPosition',e.target.value)} />
      </div>
      <div className='mt-5'>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea className='h-[200px] mt-2' placeholder="Enter details of job description"
            onChange={(e)=>onHandleInputChanges('jobdescription',e.target.value)} />     
      </div>
      <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Duration</h2>
           <Select onValueChange={(value)=>onHandleInputChanges('duration',value)}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Duartion" />
                </SelectTrigger>
                <SelectContent >
                     <SelectItem value="5">5 Min</SelectItem>
                    <SelectItem value="15">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Min</SelectItem>
                    <SelectItem value="60">60 Min</SelectItem>
                </SelectContent>
          </Select>
      </div>

       <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview type</h2>
            <div className='flex gap-3 flex-wrap mt-2'> 
                {InterviewType.map((type,index)=>(
                    <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-white border border-gray-300 rounded-2xl
                     hover:bg-secondary
                     ${interviewType.includes(type.title) && 'bg-blue-50 text-primary'}`} onClick={()=>AddInterviewType(type.title)}>
                        <type.icon className='h-4 w-4'/>
                        <span>{type.title}</span>
                    </div>
                ))}
            </div>
      </div>

      <div className='mt-7 flex justify-end '>
         <Button> Generate Questions <ArrowRight /></Button>
      </div>
     
    </div>
  )
}

export default FormConatiner
