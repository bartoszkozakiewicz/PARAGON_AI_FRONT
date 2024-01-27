import React from 'react'
import Image from 'next/image'

type Props ={
  month: string,
  year: string
}

const Folder = ({month,year}:Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
        <Image alt="Folder" width={120} height={120} src="/free_fold (1).png" className="cursor-pointer"/>  
        <p className="text-xl mr-2">{month}.{year}</p> 
    </div>
  )
}

export default Folder
