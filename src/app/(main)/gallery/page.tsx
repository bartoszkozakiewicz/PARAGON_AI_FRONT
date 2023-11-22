'use client'
import React, {useEffect,useState} from "react";
import Folder from "@/components/gallery-components/folder";
import { axiosInstance } from "@/utils/axiosInstace";
import { useAuth } from "@/context/authContext";


const page = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState<any>([]);
  useEffect(() => {
    const startDate=  new Date("01-01-2023")//user?.createdAt
    const endDate = new Date(); // dzisiaj
    const months = [];

    for (let d = startDate; d <= endDate; d.setMonth(d.getMonth() + 1)) {
      months.push(new Date(d).getMonth()+1);
      setDates([...dates,{"id": Math.floor(Math.random() * (999999 - 1 + 1)) + 1,"month": new Date(d).getMonth()+1, "year": new Date(d).getFullYear()}])
     }
     
  }, []);
  console.log("dates",dates)




  return (
    <div className="flex flex-row gap-10 flex-wrap p-10">
      {/* <p>{user}</p> */}
      {dates?.map((date:any) => <Folder key = {date.id} month={date.month} year={date.year} />)}
        {/* <Folder/> */}
    </div>
  )
};

export default page;
