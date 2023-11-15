"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {"image/*":[] }  });

  return (
    <div className="hover:cursor-pointer rounded-3xl md:w-[20%] w-[70%]  shadow-custom mx-auto text-center p-5" {...getRootProps()}>
      <input {...getInputProps()} />
      <p className="font-serif text-lg">Wrzuć zdjęcie paragonu</p>
      <Image alt="Drop" src="/img_Drop_bez.png" height="500" width="500"></Image>
    </div>
  );
}
