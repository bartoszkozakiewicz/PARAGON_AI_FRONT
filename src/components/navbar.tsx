import React from "react";
import Image from "next/image";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Navbar = () => {
  return (
    <div className="shadow-md flex flex-row justify-between  p-5">
      <div className="flex flex-row gap-2">
        <p className="text-[#212B36] font-serif text-lg">Wydane w tym miesiącu</p>
        <p className="font-semibold text-lg">1500zł</p>
      </div>
      <div className="flex flex-row gap-2">
        <SettingsOutlinedIcon className="hover:cursor-pointer" />
        <AccountCircleOutlinedIcon className="hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
