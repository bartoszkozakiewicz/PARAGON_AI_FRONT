'use client';

import React, { useEffect, useState } from 'react';
import { axiosInstance } from '@/utils/axiosInstace';
import OneProduct from '@/components/add-products-section/one_products';
import { Product, Universal, Shop } from '@/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField/TextField';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { debounce, set } from 'lodash';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import PositionedSnackbar from './personalSnackbar';
import CustomizedSnackbar from './personalSnackbar';

const path = 'http://localhost:5000/api/v1';
const list_categories = [
  { id: 1, category: 'Pozywienie' },
  { id: 2, category: 'art_budowlany' },
  { id: 3, category: 'art_gosp_dom' },
  { id: 4, category: 'art_papier' },
  { id: 5, category: 'Alkohol' },
];

const Cat = {
  pozywienie: 'Pozywienie',
  'artykuł budowlany': 'art_budowlany',
  'artykuł gospodarstwa domowego': 'art_gosp_dom',
  alkohol: 'Alkohol',
  'artykuł papierniczy': 'art_papier',
};

type Props = {
  popUpData: any;
  popUpShop: any;
};

const EditSingleParagon = ({ popUpData, popUpShop }: Props) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [actualData, setActualData] = useState<Product[] | Universal[]>([
    { name: '', price: 0, amount: 0, category: '' },
  ]);
  const [startData, setStartData] = useState<Product[] | Universal[]>([
    { name: '', price: 0, amount: 0, category: '' },
  ]);
  const [changedData, setChangedData] = useState<boolean>(false);
  const [shop, setShop] = useState<Shop>({ name: '', date: '' });
  const searchParams = useSearchParams();

  const handleAddElement = () => {
    setActualData((prevProducts: any) => {
      const newProducts = [
        ...prevProducts,
        { name: '', price: 0, amount: 0, category: '' },
      ];
      return newProducts;
    });
  };

  const handleDeleteProduct = (num: number) => {
    console.log('Usuwam produkt', num);
    setActualData((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(num, 1);
      return updatedProducts;
    });
  };

  const handleSendData = async () => {
    console.log('Send data');
    let sumPrice = 0;
    setStartData(actualData);
    actualData.forEach((prod) => {
      sumPrice += Number(prod.price);
    });
    console.log('Spozywcze');

    await axiosInstance
      .post(
        `${path}/product/addElement?cat=Spozywcze&&shopId=${popUpShop.id}`,
        { sumPrice, actualData, shop },
      )
      .then((res: any) => {
        console.log(res);
        setIsError(false);
        setMsg(res.data);
        setOpen(true);
      })
      .catch((e: any) => {
        console.log(e);
        setIsError(true);
        setMsg(e.response.data);
        setOpen(true);
      });
  };

  //Check if data has changed
  useEffect(() => {
    const arraysAreEqual = (a: any, b: any) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        for (const key in a[i]) {
          if (a[i][key] != b[i][key]) return false;
        }
      }
      return true;
    };
    if (!arraysAreEqual(actualData, startData)) {
      setChangedData(true);
    } else {
      setChangedData(false);
    }
  }, [actualData, startData]);
  console.log('changed data', changedData);

  useEffect(() => {
    const dateObject = new Date(searchParams.get('shopDate') as string); //searchParams.get("shopDate")
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Dodaj 1 do miesiąca, formatuj jako dwucyfrowy
    const day = dateObject.getDate().toString().padStart(2, '0'); // Formatuj jako dwucyfrowy
    const formattedDate = `${year}-${month}-${day}`;

    setShop({
      name: popUpShop.shop_name ? popUpShop.shop_name : '',
      date: popUpShop.date,
    });

    setActualData(
      popUpData.map((prod: any) => {
        return {
          name: prod.product_name,
          price: prod.price,
          amount: prod.ilosc,
          category: (Cat as any)[prod.category.toLowerCase()],
        };
      }),
    );
    setStartData(
      popUpData.map((prod: any) => {
        return {
          name: prod.product_name,
          price: prod.price,
          amount: prod.ilosc,
          category: (Cat as any)[prod.category.toLowerCase()],
        };
      }),
    );
  }, []);

  //Check if data has changed
  useEffect(() => {
    const arraysAreEqual = (a: any, b: any) => {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        for (const key in a[i]) {
          if (a[i][key] != b[i][key]) return false;
        }
      }
      return true;
    };

    const debouncedCompareData = debounce(() => {
      if (!arraysAreEqual(actualData, startData)) {
        setChangedData(true);
      } else {
        setChangedData(false);
      }
    }, 300);

    debouncedCompareData();
  }, [actualData, startData]);

  //${saveEnabled ? "bg-blue-500" : "bg-gray-400 cursor-auto"}
  return (
    <div className="flex mx-auto items-center justify-center w-[80%] mt-10">
      <div className="flex flex-col gap-3 p-6 shadow-custom rounded-lg w-[100%] min-h-[500px] max-h-[500px] items-center">
        <div className="flex flex-row items-left w-[100%] gap-4 justify-start">
          <TextField
            id="outlined-basic"
            label="Nazwa Sklepu"
            value={shop.name ? shop.name : ''}
            variant="outlined"
            onChange={(e) =>
              setShop((prevData: Shop) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(shop.date)}
              onChange={(date: any) =>
                setShop((prevData: Shop) => ({
                  ...prevData,
                  date: date.format('YYYY-MM-DD'),
                }))
              }
            />
          </LocalizationProvider>
          <button
            onClick={handleSendData}
            className={`ml-auto rounded-xl p-3 text-white ${
              changedData ? 'bg-blue-500' : 'bg-gray-400 pointer-events-none'
            } font-sans`}
          >
            EDYTUJ
          </button>
        </div>
        <p className="font-semibold font-sans mt-3">PRODUKTY</p>
        <div className="flex flex-col gap-3 max-h-[300px] p-6 overflow-y-auto">
          {actualData.map((product: any, index: number) => (
            <OneProduct
              key={index}
              num={index}
              list_categories={list_categories}
              activeButton="Spozywcze"
              product={product}
              setProducts={setActualData}
              handleDeleteProduct={(num: number) => handleDeleteProduct(num)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddElement}
            sx={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
            }}
          >
            <AddIcon />
          </Button>
        </div>
        <CustomizedSnackbar
          isError={isError}
          msg={msg}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
};

export default EditSingleParagon;
