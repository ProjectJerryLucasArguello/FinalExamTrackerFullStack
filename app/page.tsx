import React from 'react'
import Header from './brackets/header'
import Footer from './brackets/footer'
import SearchFinals from './MainSearch/searchFinals'
const page = () => {
  return (
  //I got to make the header
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-zinc-700 text-white text-center">
          <Header/>
        </div>
        <div className="flex-grow p-4">
          <SearchFinals />
        </div>
        <div className='bg-zinc-700 text-white text-center'>
          <Footer/>
        </div>
     </div>
    </> 
  //Then the footer on the bottom
  )
}

export default page