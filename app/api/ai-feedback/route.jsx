// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { QUESTIONS_PROMPT } from "@/services/Constonts";

// import { FEEDBACK_PROMPT } from "@/services/Constonts";

// export async function POST(req) {
//     const {conversation} = await req.json();
//     const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));
     
//     try {
//         // const { jobPosition, jobdescription, duration, type } = await req.json();
    
    
//         // if (!jobPosition || !jobdescription || !duration || !type) {
//         //   return NextResponse.json(
//         //     { error: "Missing required fields." },
//         //     { status: 400 }
//         //   );
//         // }
    
//         // const FINAL_PROMPT = QUESTIONS_PROMPT
//         //   .replace("{{jobTitle}}", jobPosition)
//         //   .replace("{{jobDescription}}", jobdescription)
//         //   .replace("{{duration}}", duration)
//         //   .replace("{{type}}", type);
    
//         const openai = new OpenAI({
//         apiKey: process.env.GEMINI_API_KEY,
//         baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
//     });
    
//     const response = await openai.chat.completions.create({
//         model: "gemini-2.0-flash",
//         messages: [
//             { role: "user", content: FINAL_PROMPT },
    
//         ],
       
//     });
    
//     console.log(response.choices[0].message);
    
//         return NextResponse.json(response.choices[0]?.message || {});
    
//       } catch (error) {
//         console.error("DeepSeek API Error:", error);
//         return NextResponse.json(
//           { error: "Failed to generate questions" },
//           { status: 500 }
//         );
//       }
    
// }


import { FEEDBACK_PROMPT } from '@/services/Constonts';
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    const conversationText = conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n');

    const finalPrompt = FEEDBACK_PROMPT.replace('{{conversation}}', conversationText);

    const openai = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    });

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "user", content: finalPrompt }
      ],
    });

    const feedbackContent = response.choices?.[0]?.message?.content;

    // Parse JSON response from AI safely
    let parsedFeedback;
    try {
      parsedFeedback = JSON.parse(feedbackContent);
    } catch (e) {
      console.warn('⚠️ Failed to parse feedback JSON:', e);
      parsedFeedback = { raw: feedbackContent };
    }

    return NextResponse.json(parsedFeedback);
  } catch (err) {
    console.error('❌ Server error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
