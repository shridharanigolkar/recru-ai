'use client'
import React, { useState } from 'react'
import WelcomeContainer from '../_components/WelcomeContainer'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import FormConatiner from './_components/FormConatiner'
import QuestionsList from './_components/QuestionsList'
import { toast } from 'sonner'
function CreateInterView() {
    const router = useRouter();
    const[step,setStep]=useState(1);
    const[formData,setFormData] = useState({});

    const onHandleInputChanges = (field,value) =>{
    setFormData(prev=>({
      ...prev,
      [field]:value
    }))
   
   }

   const onGoToNext = () =>{
    if(!formData?.jobPosition || !formData?.jobdescription ||  !formData?.duration || !formData?.type){
      toast('Please enter all detials');
      return ;
    }
    setStep(step+1);
   }

  return (
    <div>
          <WelcomeContainer />
         <div className='mt-10 px-10 md:px-24 lg:px-44 xl:px-56'>
               <div className='flex gap-5 items-center'>
                    <ArrowLeft  onClick={()=> router.back()} className='cursor-pointer'/>
                    <h2 className='font-bold text-2xl'>Create New Interview</h2>
                               
                </div>
                 <Progress value={step * 33.33} className='my-5' />    
                { step ==1 ? <FormConatiner  onHandleInputChanges={onHandleInputChanges} 
                GoToNext ={()=>onGoToNext()}/> : step ==2 ?
                 <QuestionsList formData={formData}/> : null }
                 
        </div>
    </div>
    
  )
}

export default CreateInterView
