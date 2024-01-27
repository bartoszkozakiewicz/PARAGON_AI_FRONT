import React from 'react';
import Login_img1 from '../../../../public/assets/login_img1';
import Loginform from '@/components/auth/loginform';

const Login = () => {
  return (
    <div className="flex flex-row  font-poppins min-h-screen">
      <div className="basis-[40%] flex items-center justify-center bg-[#E5EFF8]">
        <Login_img1 />
      </div>
      <div className="p-12 basis-[60%] justify-center flex flex-col items-center ">
        <Loginform />
      </div>
    </div>
  );
};

export default Login;
