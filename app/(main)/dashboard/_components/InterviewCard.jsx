import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy, Send } from 'lucide-react';
import { toast } from 'sonner';

function InterviewCard({ interview }) {
  const formattedDate = moment(interview?.created_at).format('DD MMM YYYY');
  const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('Link copied to clipboard!');
  };

  const onSend = () => {
    const subject = encodeURIComponent('Ai Criter Interview Link');
    const body = encodeURIComponent(`Interview link: ${url}`);
    //window.location.href = `mailto:try.shridhar@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className='p-5 bg-white rounded-lg border relative'>
      <div className='flex justify-between items-start'>
        <div className='h-[40px] w-[40px] rounded-full bg-primary'></div>
        <h2 className='text-sm text-gray-500'>{formattedDate}</h2>
      </div>

      <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
      <h2 className='mt-2 text-sm'>{interview?.duration} min</h2>

      <div className='flex gap-3 mt-5'>
        <Button
          variant="outline"
          className='flex-1 flex items-center justify-center whitespace-nowrap'
          onClick={copyLink}
        >
          <Copy className='w-4 h-4' />
          <span className='ml-2'>Copy Link</span>
        </Button>

        <Button
          className='flex-1 flex items-center justify-center whitespace-nowrap'
          onClick={onSend}
        >
          <Send className='w-4 h-4' />
          <span className='ml-2'>Send</span>
        </Button>
      </div>
    </div>
  );
}

export default InterviewCard;
