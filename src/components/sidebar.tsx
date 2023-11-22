"use client";

import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Image from "next/image";
import Link from "next/link";

const SidebaR = () => {
  const sites = [
    { id: 1, name: "Baza danych", link: "/" },
    { id: 2, name: "Dodawanie paragonu", link: "/add-paragon" },
    { id: 3, name: "Analiza danych", link: "/analytics" },
    { id: 4, name: "Galeria paragonów", link: "/gallery" },
    { id: 5, name: "Dodawanie ręczne", link: "/add-no-paragon" },
  ];
  return (
    <div className="font-serif text-lg flex flex-col basis-1/5 bg-[#2A2A2A] text-white">
      <div className="flex flex-col items-center justify-center p-6">
        <p className="font-semibold font-serif text-xl">ParagonAI</p>
        <Image src="/logo.png" width={100} height={100} alt="Picture of the author" />
      </div>
      {sites.map((site) => (
        <Link key={site.id} href={site.link}>
          <div className="flex flex-row p-3 hover:bg-slate-500">{site.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default SidebaR;
