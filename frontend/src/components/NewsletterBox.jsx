import React from 'react'

function NewsletterBox() {
   const onSubmitHandler =(e)=>{
    e.preventDefault();
   }

    return (
        <div className='text-center' onSubmit={onSubmitHandler}>
             <p className='text-2xl font-medium text-gray-800'>Subscribe</p>
             <p className='text-gray-400 mt-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. .</p>
             <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your eamil' required/>
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
             </form>
        </div>
    )
}

export default NewsletterBox
