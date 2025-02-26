'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { BsTelephone } from 'react-icons/bs'
import {usePathname} from 'next/navigation'

export default function HeaderToggler() {
  //NAVIGATION
  const pathname =usePathname()
  const isActive = (path:string) =>{
    return pathname.startsWith(path);
  }
  const Topheader = useRef<HTMLDivElement | null>(null)
  
  useEffect(()=>{
    if(Topheader?.current!==null){
      if(window.scrollY>0){
        Topheader.current?.classList?.add('hidden')
      }else{
        Topheader.current.classList.remove('hidden')
        Topheader.current.classList.add('flex')
      }
    }
    window.addEventListener('scroll',(e)=>{
      if(Topheader?.current!==null){
        if(window.scrollY>0){
          Topheader.current.classList.add('hidden')

        }else{
          Topheader.current.classList.remove('hidden')
          Topheader.current.classList.add('flex')
        }
      }
    })
  },[])
  /* h-[3rem] sm:h-[2rem] */
  if(isActive('/auth')){
    return null
  }
  return (
    <>
        <div ref={Topheader} className="mybg py-1 items-center sm:gap-3 justify-center sm:justify-between flex-wrap lg:px-8 px-2  pr-5 overflow-hidden hidden">
            <div className="flex">
                <div className="flex items-center mt-1"><BsTelephone color="white"/></div>
                <div className=" text-white text-sm"> +237674751815</div>
            </div>
            <div className="flex gap-3">
                <div className="text-white text-sm">Get 50% Off on selected Items</div>  
                <div className="text-white text-sm"> | </div>
                <Link href={'/deals'} className=" font-semibold text-sm cursor-pointer text-red-500"> Shop Now</Link>
            </div>
            
        </div>
    </>
  )
}
