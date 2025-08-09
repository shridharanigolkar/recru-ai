'use client'
import React, { useContext, useEffect, useState} from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Loader2Icon, Video } from 'lucide-react'
import { Input } from "@/components/ui/input" 
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { useRouter } from 'next/navigation'

function Interview() {
    const {interview_id} = useParams();
   const[interviewData,setInterviewData]=useState([]);
   const [userName,setUserName]=useState();
   const[userEmail,setUserEmail]=useState();
   const[loading,setLoading]=useState(false);
    const{interviewInfo,setInterviewInfo}=useContext(InterviewDataContext)
   const router = useRouter();
  

    useEffect(()=>{
        interview_id&&GetInterviewDetails();
    },[interview_id])
    const GetInterviewDetails =async  ()=> {
        setLoading(true);
        try{
                    let { data: interviews, error } = await supabase
                    .from('interviews')
                    .select("jobPosition,jobdescription,duration,type,questionList")
                    .eq('interview_id',interview_id)
                    setInterviewData(interviews[0]);
            
                  
                      setLoading(false);
                    if(interviews?.length == 0){
                       toast('Incorect Interview Id');
                    }
                   
        }catch(e){
            setLoading(false);
            toast('Incorrect interview Link')
        }
  }

  const  onJoinInterview = async () => {
    setLoading(true);
  let { data: interviews, error } = await supabase
  .from('interviews')
  .select('*')
  .eq('interview_id',interview_id)
  
   setInterviewInfo({
    userName:userName,
    userEmail : userEmail,
    interviewData:interviews[0]
   });
   router.push('/interview/' + interview_id + '/start');
  setLoading(false);
  }

  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-80 mt-7 '>
         <div className='flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-33 xl:px-52 '>
              <Image  src={'/imagebg1.png'} alt='logo' width={200} height={200}  className='w-[140px] mt-4'/>
             
              <h2 className='mt-3'>AI-Powered Interview Platform</h2>
               <Image  src={'/interview.png'} alt='interview' width={500} height={500}  className='w-[280px] my-6'/>

               <h2 className='font-bold text-xl'>{interviewData?.jobPosition}</h2>
               <h2 className='flex gap-2 items-center text-gray-500 mt-3'> <Clock className='h-4 w-4' />{interviewData?.duration} Min</h2>

               <div className='w-full '>
                 <h2> Enter Your Full Name</h2>
                 <Input placeholder='e.g John Smith' onChange={(event)=>setUserName(event.target.value)} />
               </div>
               <div className='w-full '>
                 <h2> Enter Your Email</h2>
                 <Input placeholder='e.g john@gmail.com' onChange={(event)=>setUserEmail(event.target.value)} />
               </div>
               <div className='p-3 bg-blue-100 flex gap-4 rounded-lg mt-4'>
                      <Info className='text-primary' />
                      <div>
                                <h2 className='font-bold'>Before you begin</h2>
                                <ul className=''>
                                    <li className='text-sm text-primary'>Test your camera and microphone</li>
                                    <li className='text-sm text-primary'>Ensure you have a stable internet connection</li>
                                    <li className='text-sm text-primary'>Find a Quiet Place for Interview</li>

                                </ul>
                        </div>
               </div>

               <Button className='mt-5 w-full font-bold'
                disabled={loading || !userName}
                onClick={()=>onJoinInterview()}
               ><Video/>{ loading &&  <Loader2Icon/> }Join Interview</Button>
               
         </div>
    </div>
  )
}

export default Interview
