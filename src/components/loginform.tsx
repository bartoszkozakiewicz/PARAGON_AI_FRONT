"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import axios from "axios";

const Loginform = () => {
  const path = "http://localhost:5000/api/v1";
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const sendData = async () => {
    console.log("wysyłanie danych");
    await axios
      .post(path + "/auth/login", loginData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.data.response);
      });
  };

  return (
    <div className="w-[70%] flex flex-col items-center  ">
      <p className="text-[#212B36] text-bold text-[26px] mb-16">Login your Account</p>
      <p className="text-[#7C838A] self-start mb-1">Email</p>
      <TextField
        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        value={loginData.email}
        id="outlined-basic"
        label="Enter your email"
        variant="outlined"
        style={{
          width: "100%",
          marginBottom: "5%",
        }}
      />
      <p className="text-[#7C838A] self-start mb-1">Password</p>

      <TextField
        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        value={loginData.password}
        id="outlined-basic"
        label="Enter your password"
        variant="outlined"
        style={{
          width: "100%",
          marginBottom: "5%",
        }}
      />
      <button onClick={sendData} className="outline-none text-[23px] bg-[#E5EFF8] w-[70%] h-[60px] rounded-3xl mb-6">
        Login Here
      </button>
      <p className="text-[#B0BAC3] text-[24px] mb-3">- OR -</p>
      <div className="flex flex-row gap-2 text-[#7C838A]">
        <p>Create an account?</p>
        <Link className="text-[#6EB6FF]" href="register">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Loginform;
