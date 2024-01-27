'use client';

import { axiosInstance } from '@/utils/axiosInstace';
import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
const path = 'http://localhost:5000/api/v1';
import CustomizedSnackbar from '@/components/personalSnackbar';
// export async function generateStaticParams() {
//   // const images = await axiosInstance
//   //   .get(`${path}/paragon/getImages`)
//   //   .then((res) => res.data.images);
//   // console.log('Images', images);
//   return ['2023-11', '2023-11'];
//   // return images.map((image: any) => ({
//   //   id: '2023-11', //image.date.split('-').slice(0, 2).join('-'),
//   // }));
// }

const page = ({ params: { id } }: { params: { id: string } }) => {
  const [images, setImages] = useState<any>([]);
  const [msg, setMsg] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    const getImages = async () => {
      const images = await axiosInstance
        .get(`${path}/paragon/getImages?date=${id}`)
        .then((res) => res.data.images)
        .catch((e) => {
          if (e.response.status === 500) {
            setMsg('Server 500 Error...');
          } else {
            setMsg('Coś poszło nie tak, spróbuj ponownie...');
          }
          setIsError(true);
          setOpen(true);
        });
      setImages(images);
    };
    getImages();
  }, []);

  return (
    <div className="p-10 flex flex-row gap-10 flex-wrap">
      {images?.map((image: any) => (
        <div className="flex flex-col items-center" key={image.id}>
          <p>{image.date}</p>
          <Image
            className="rounded-xl"
            alt={`${image.id}`}
            src={`data:image/jpeg;base64,${image.data}`}
            width={200}
            height={200}
          />
          <a
            className="bg-[#2A2A2A] mt-2 p-2 text-white rounded-2xl"
            href={`data:image/jpeg;base64,${image.data}`}
            download="image.jpg"
          >
            Pobierz Zdjęcie
          </a>
        </div>
      ))}
      <CustomizedSnackbar
        isError={isError}
        msg={msg}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default page;
