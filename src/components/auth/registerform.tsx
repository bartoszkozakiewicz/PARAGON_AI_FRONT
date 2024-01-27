'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import axios from 'axios';
const Registerform = () => {
  const path = 'http://localhost:5000/api/v1';
  const { push } = useRouter();

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const sendData = async () => {
    await axios
      .post(path + '/auth/register', registerData)
      .then((res) => {
        console.log(res);
        push('/login');
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <div className="w-[70%] flex flex-col items-center  ">
      <p className="text-[#212B36] text-bold text-[26px] mb-16">
        Create your Account
      </p>
      <p className="text-[#7C838A] self-start  mb-2">Name</p>
      <TextField
        onChange={(e) =>
          setRegisterData({ ...registerData, name: e.target.value })
        }
        value={registerData.name}
        id="outlined-basic"
        label="Enter your email"
        variant="outlined"
        style={{
          width: '100%',
          marginBottom: '5%',
        }}
      />
      <p className="text-[#7C838A] self-start  mb-2">Email</p>
      <TextField
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
        value={registerData.email}
        id="outlined-basic"
        label="Enter your email"
        variant="outlined"
        style={{
          width: '100%',
          marginBottom: '5%',
        }}
      />
      <p className="text-[#7C838A] self-start mb-2">Password</p>

      <TextField
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
        value={registerData.password}
        id="outlined-basic"
        label="Enter your password"
        variant="outlined"
        style={{
          width: '100%',
          marginBottom: '5%',
        }}
      />
      <button
        onClick={sendData}
        className="outline-none text-[23px] bg-[#E5EFF8] w-[70%] h-[60px] rounded-3xl mb-6"
      >
        Sign up
      </button>
      <p className="text-[#B0BAC3] text-[24px] mb-3">- OR -</p>
      <div className="flex flex-row gap-2 text-[#7C838A]">
        <p>Already have an account?</p>
        <Link className="text-[#6EB6FF]" href="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Registerform;
