// import { Loader, Loader2Icon } from 'lucide-react';
// import React, { useEffect, useState } from 'react'
// import { toast } from 'sonner';

// function QuestionsList({formData}) {
//   function GenerateQuestionList({formData}){
// const [loading, setLoading] = useState(true);


//   useEffect(()=>{
//    if(formData){
//     GenerateQuestionList();
//    }
//   },[formData])
   
//   const GenerateQuestionList = async () => {
//     setLoading(true);
//     try{
//       const result = await axios.post('/api/ai-model',{
//       ...formData
//     })
//     console.log(result.data);
//     setLoading(false);
//     }catch(e){
//       toast('server error try again');
//       setLoading(false);
//     }
   
// }

//   }
//   return (
//     <div>
//      {loading && <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>

//       <Loader2Icon className='animate-spin' />
//       <div>
//         <h2>Generating Interview Questions </h2>
//         <p>our AI is crafting personalizes questions based on your job description</p>
//       </div>
//      </div>}
//     </div>
//   )
// }

// export default QuestionsList


'use client';
import { Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

function QuestionsList({ formData }) {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (formData) {
      generateQuestions();
    }
  }, [formData]);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });
      console.log(result.data);
      setQuestions(result.data.questions || []); // assuming API returns an array
    } catch (e) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2>Generating Interview Questions</h2>
            <p>Our AI is crafting personalized questions based on your job description...</p>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="font-bold mb-2">Generated Questions:</h3>
          <ul className="list-disc ml-6">
            {questions.map((q, idx) => (
              <li key={idx}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuestionsList;
