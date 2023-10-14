"use client";

import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Image from "next/image";
import Link from "next/link";

const SidebaR = () => {
  return (
    <Sidebar>
      <Menu
        className=" bg-[#2A2A2A] min-h-screen text-white"
        menuItemStyles={{
          button: {
            // the active class will be added automatically by react router
            // so we can use it to style the active menu item
            [`&.active`]: {
              backgroundColor: "#13395e",
              color: "black",
            },
          },
        }}
      >
        <div className="flex flex-col items-center justify-center p-6">
          <p className="font-semibold font-serif text-xl">ParagonAI</p>
          <Image src="/logo.png" width={100} height={100} alt="Picture of the author" />
        </div>
        <Link href="/database">
          <MenuItem>Baza danych</MenuItem>
        </Link>
        <Link href="/add-paragon">
          <MenuItem> Dodawanie paragonu</MenuItem>
        </Link>
        <Link href="/analytics">
          <MenuItem> Analiza danych</MenuItem>
        </Link>
        <Link href="/gallery">
          <MenuItem> Galeria paragonów</MenuItem>
        </Link>
      </Menu>
    </Sidebar>
  );
};

export default SidebaR;
