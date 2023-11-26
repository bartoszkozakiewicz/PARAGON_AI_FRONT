'use client';
import io from 'socket.io-client';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { axiosInstance } from '@/utils/axiosInstace';
const path = 'http://localhost:5000/api/v1';
import WebSocketClient from '@/utils/webSocketClient';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import ParagonDialog from './paragonDialog';

export default function MyDropzone() {
  const [paragon, setParagon] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openParagon, setOpenParagon] = useState<boolean>(false);
  const [popUpData, setPopUpData] = useState<any>(null);
  const [popUpShop, setPopUpShop] = useState<any>(null);

  // const getStreamData = async () => {
  //   const eventSource = new EventSource(`http://127.0.0.1:5000/stream`);
  //   eventSource.onmessage = (event) =>
  //     console.log(`Received event: ${event.data}`);

  //   return () => {
  //     eventSource.close();
  //   };
  // };

  const sendParagon = async (paragon: Buffer) => {
    const x = await axiosInstance
      .post(`${path}/paragon/getParagon`, {
        paragonBuffer: paragon,
      })
      .then((res) => {
        setIsLoading(false);
        setOpenParagon(true);
        console.log('GOT IT', res.data);
        setPopUpData(res.data.products);
        setPopUpShop(res.data.shop);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        // Do whatever you want with the file contents
        setIsLoading(true);
        const paragonArrBuff = reader.result as ArrayBuffer;
        const paragonBuff = Buffer.from(paragonArrBuff);

        setParagon(paragonBuff);
        sendParagon(paragonBuff);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  // const handleDataReceived = (data: any) => {
  //   console.log('Received data:', data);
  // };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`hover:cursor-pointer rounded-3xl md:w-[20%] w-[70%]  shadow-custom mx-auto text-center p-5 ${
          isLoading ? 'pointer-events-none opacity-50' : ''
        }`}
        {...getRootProps()}
      >
        {/* <WebSocketClient onDataReceived={handleDataReceived} /> */}
        <input {...getInputProps()} />
        <p className="font-serif text-lg">Wrzuć zdjęcie paragonu</p>
        <Image
          alt="Drop"
          src="/img_Drop_bez.png"
          height="500"
          width="500"
        ></Image>
      </div>
      {isLoading && (
        <Box sx={{ width: '70%', marginTop: '100px' }}>
          <LinearProgress />
        </Box>
      )}
      <ParagonDialog
        openParagon={openParagon}
        setOpenParagon={setOpenParagon}
        popUpData={popUpData}
        popUpShop={popUpShop}
      />
    </div>
  );
}
