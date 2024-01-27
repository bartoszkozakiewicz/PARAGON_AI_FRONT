'use client';

import React, { useEffect, useState } from 'react';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Tooltip } from 'react-tooltip';
import { useAuth } from '@/context/authContext';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/utils/axiosInstace';
import { useSum } from '../context/moneyContext';

const Navbar = () => {
  const { sum, updateSum } = useSum();
  const { user, logout } = useAuth();

  // const [sum, setSum] = React.useState<number | null>(null);
  useEffect(() => {
    if (!sum) {
      const getSum = async () => {
        try {
          const res = await axiosInstance.get(
            'http://localhost:5000/api/v1/product/sum',
          );
          console.log('dodaje z poziomu navigation', res.data.sum, sum);
          updateSum('+', res.data.sum);
        } catch (error) {
          console.error('Error fetching sum:', error);
        }
      };
      getSum();
    }
  }, []);

  return (
    <div className="shadow-md flex flex-row justify-between  p-5">
      <div className="flex flex-row gap-2">
        <p className="text-[#212B36] font-serif text-lg">
          Wydane w tym miesiącu
        </p>
        <p className="font-semibold text-lg">
          {sum !== (null || NaN) ? sum : '... '} zł
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <SettingsOutlinedIcon className="hover:cursor-pointer" />

        <AccountCircleOutlinedIcon
          className="hover:cursor-pointer"
          data-tooltip-id="logout-tooltip"
          data-tooltip-content="Logout"
          style={{ cursor: 'pointer' }}
          onClick={() => logout(user.userId)}
        />
      </div>
      <Tooltip id="logout-tooltip" place="bottom-end" />
    </div>
  );
};

export default Navbar;
