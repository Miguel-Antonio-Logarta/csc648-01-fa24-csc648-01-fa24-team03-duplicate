import React from 'react';
import RatingSelector from './RatingSelector';
import ImageAttachment from './ImageAttachment';

function ReviewForm() {
  return (
    <form className="flex overflow-hidden flex-col gap-[30px] items-start mx-auto px-20 py-11 text-xl font-bold border-rose-300 border-solid bg-[rgb(255,250,228)] border-[3px] max-w-[844px] rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-600 max-md:px-5">
      <div className='m-xlarge p-medium mx-auto'>  
        <header className="font-josefin text-3xl p-2 tracking-[3.2px] max-md:max-w-full">
          J. Paul Lenard Library
        </header>
        <RatingSelector />
        <textarea
          className="font-josefin flex shrink-0 self-stretch mt-9 p-smed w-[650px] bg-gray rounded-[8px] border border-rose-300 border-solid border-t- h-[229px]"
          aria-label="Write your review"
        />
        <ImageAttachment />
        <div className="flex gap-2 justify-end p-smed mt-large -mb-2 text-2xl text-center whitespace-nowrap text-stone-50 tracking-[2.4px]">
          <button className='font-shantell bg-sage h-12 text-white p-large px-3 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5'>cancel</button>
          <button className='font-shantell bg-blue-200 text-white px-3 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5'>submit!</button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;