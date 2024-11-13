import React from 'react';
import Image from 'next/image';
import Logo from '../images/njit-logo-05BF4F701A-seeklogo.com.png';
//Since we implemented tailwind CSS both tailwindCSS and React js use the className 
//Need to place the image on the page
const header = () => {
  return (
    <div className="header-container flex flex-col items-center justify-center ">
      <Image src={Logo} alt="NJIT Logo" className="logo py-4 scale-90 " />
      <div className='welcoming-text'>
        <div className="font-sans text-center mt-4 text-4xl pb-3  max-w-xs mx-auto">
            Final Exam Organizer      
        </div>
      </div>
    </div>
  )
}
//font-serif text-center custom-text max-w-xs mx-auto
export default header