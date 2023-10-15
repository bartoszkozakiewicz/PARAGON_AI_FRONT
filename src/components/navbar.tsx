"use client";

import React from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Tooltip } from "react-tooltip";
import { useAuth } from "@/context/authContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log("dziwne", user);
  return (
    <div className="shadow-md flex flex-row justify-between  p-5">
      <div className="flex flex-row gap-2">
        <p className="text-[#212B36] font-serif text-lg">Wydane w tym miesiącu</p>
        <p className="font-semibold text-lg">1500zł</p>
      </div>
      <div className="flex flex-row gap-2">
        <SettingsOutlinedIcon className="hover:cursor-pointer" />

        <AccountCircleOutlinedIcon
          className="hover:cursor-pointer"
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Logout"
          style={{ cursor: "pointer" }}
          onClick={() => logout(user.userId)}
        />
      </div>
      <Tooltip id="logout-tooltip" place="bottom-end" />
    </div>
  );
};

export default Navbar;
