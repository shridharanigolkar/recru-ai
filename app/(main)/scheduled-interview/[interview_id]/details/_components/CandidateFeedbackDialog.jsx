import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Progress } from '@/components/ui/progress'

function CandidateFeedbackDialog({candidate}) {
    const feedback = candidate?.feedback;
  return (
    <Dialog>
        <DialogTrigger asChild>
                <Button className={'text-primary '} variant={'outline'} >View Report</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <DialogDescription asChild>
                <div className='mt-5'>
                     <div className='flex items-center gap-5'>
                                         <h2 className='bg-primary p-3 px-4.5 font-bold text-white rounded-full'>{candidate.userName[0]}</h2>
                                             <div>
                                                 <h2 className='font-bold'>{candidate?.userName}</h2>
                                                 <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                                             </div>
                     </div>
                      <div className='mt-5'>
                           <h2 className='font-bold'>Skill Assesment</h2>
                           <div className='mt-3 grid grid-cols-2 gap-10'>
                               <div>
                                   <h2 className='flex justigy-between'>Technical Skills:   <span> {feedback.rating.technicalSkills}/10 </span>  </h2>
                                   <Progress value={feedback.rating.technicalSkills*10} className={'mt-1'}/>
                               </div>
                                <div>
                                   <h2 className='flex justigy-between'>Communication :   <span> {feedback.rating.communication}/10 </span>  </h2>
                                   <Progress value={feedback.rating.communication*10} className={'mt-1'}/>
                               </div>
                               <div>
                                   <h2 className='flex justigy-between'>Problem Solving :   <span> {feedback.rating.problemSolving}/10 </span>  </h2>
                                   <Progress value={feedback.rating.problemSolving*10} className={'mt-1'}/>
                               </div>
                                <div>
                                   <h2 className='flex justigy-between'>Experiance :   <span> {feedback.rating.experience}/10 </span>  </h2>
                                   <Progress value={feedback.rating.experience*10} className={'mt-1'}/>
                               </div>
                           </div>
                     </div>       

                    <div className='mt-5'>
                        <h2 className='font-bold'>Performance Summary</h2>
                        <div className='mt-5 bg-secondary'>
                                      {Array.isArray(feedback?.summary) ? (
                            feedback.summary.map((summary, index) => (
                            <p key={index}>{summary}</p>
                            ))
                        ) : (
                            <p>{feedback?.summary || "No summary available."}</p>
                        )}
                        </div>
                       
                    </div>
                    
                    <div className={`mt-10 p-5 flex items-center justify-between rounded-md ${feedback?.Recommendation == 'No'?'bg-red-100':'bg-green-100' }`}>
                       <div>
                                 <h2 className={`font-bold ${feedback?.Recommendation == 'No'?'text-red-700':'text-green-700' }`}>Recommendation Message</h2>
                               <p className={` ${feedback?.Recommendation == 'No'?'text-red-500':'text-green-500' }`}>{feedback?.RecommendationMsg}</p>
                       </div>
                      {/* <Button className={` ${feedback?.Recommendation == 'No'?'bg-red-700':'bg-green-700' }`}>Send Message</Button> */}
                       
                    </div>

                               
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedbackDialog
