import React from "react";
import Registerform from "@/components/auth/registerform";
import Register_img from "../../../../public/assets/register_img";

const Register = () => {
  return (
    <div className="flex flex-row  font-poppins min-h-screen">
      <div className="basis-[40%] flex items-center justify-center bg-[#E5EFF8]">
        <Register_img />
      </div>
      <div className="p-12 basis-[60%] justify-center flex flex-col items-center ">
        <Registerform />
      </div>
    </div>
  );
};

export default Register;
