'use client';
import React, { useEffect, useState } from 'react';
import Folder from '@/components/gallery-components/folder';
import { axiosInstance } from '@/utils/axiosInstace';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';
const path = 'http://localhost:5000/api/v1';

const page = () => {
  const { user } = useAuth();
  const [dates, setDates] = useState<any>([]);
  useEffect(() => {
    console.log('user', user?.createdAt);
    const startDate = new Date(user?.createdAt);
    const endDate = new Date();
    const months = [];

    for (let d = startDate; d <= endDate; d.setMonth(d.getMonth() + 1)) {
      console.log('Petla');
      months.push(new Date(d).getMonth() + 1);
      setDates([
        ...dates,
        {
          id: Math.floor(Math.random() * (999999 - 1 + 1)) + 1,
          month: new Date(d).getMonth() + 1,
          year: new Date(d).getFullYear(),
        },
      ]);
    }
  }, []);
  const kurwa = async () => {
    const images = await axiosInstance
      .get(`${path}/paragon/getImages`)
      .then((res) => res.data.images);
    console.log('Images', images);
    images.map((image: any) => {
      console.log('Petla:', image.date.split('-').slice(0, 2).join('-').trim());
    });
  };
  kurwa();
  return (
    <div className="flex flex-row gap-10 flex-wrap p-10">
      {/* <p>{user}</p> */}
      {dates?.map((date: any) => (
        <Link key={date.id} href={`/gallery/2023-11`}>
          <Folder month={date.month} year={date.year} />
        </Link>
      ))}
    </div>
  );
};

export default page;
//
