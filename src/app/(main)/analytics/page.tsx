'use client';

import { axiosInstance } from '@/utils/axiosInstace';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import MyDatePickerModal from '@/components/dateDialog';
import CustomizedSnackbar from '@/components/personalSnackbar';
const page = () => {
  const path = 'http://localhost:5000/api/v1';
  const [msg, setMsg] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [firstChartData, setFirstChartData] = useState<any>(null); //[{date:"",shopping:0,other:0,enterntainment:0,transport:0}]
  const [secondChartData, setSecondChartData] = useState<any>();
  const [thirdChartData, setThirdChartData] = useState<any>();
  const [prices, setPrices] = useState<any>(null);
  const [productsPrices, setProductsPrices] = useState<any>(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const getData = async (firstDate: string, secondDate: String) => {
    const allDataNeeded = await axiosInstance
      .get(`${path}/product/neededData?date1=${firstDate}&&date2=${secondDate}`)
      .then((res) => {
        res.data.endData.map((ele: any) => {
          ele.date = new Date(ele.date);
          return ele;
        });
        res.data.endProducts.map((ele: any) => {
          ele.date = new Date(ele.date);
          return ele;
        });
        setFirstChartData(res.data.endData);
        setThirdChartData(res.data.endProducts);
        setPrices({
          sumEnertainmentPrice: res.data.sumEnertainmentPrice,
          sumOtherPrice: res.data.sumOtherPrice,
          sumShopPrice: res.data.sumShopPrice,
          sumTransportPrice: res.data.sumTransportPrice,
        });
        setProductsPrices(res.data.sumProductPrices);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 500) {
          setMsg('Server 500 Error, refresh page...');
        } else {
          setMsg('Coś poszło nie tak, odświez stronę...');
        }
        setIsError(true);
        setOpen(true);
      });
  };

  useEffect(() => {
    const fetch = async () => {
      const todayDate = new Date();
      const year = todayDate.getFullYear();
      const month = String(todayDate.getMonth() + 1).padStart(2, '0');
      const day = String(todayDate.getDate()).padStart(2, '0');
      const today = `${year}-${month}-${day}`;
      const firstDay = `${year}-${month}-01`;
      console.log('o co chodzi', firstDay, today);
      await getData(firstDay, today);
    };
    fetch();
    setLoading(false);
  }, []);

  //--------------------------Wykres 1 - WYDATKI OD KATEGORII
  const keyToLabel: { [key: string]: string } = {
    entertainment: 'Wydatki na rozrywkę (PLN)',
    shopping: 'Wydatki na zakupy spozywcze (PLN)',
    transport: 'Wydatki na transport (PLN)',
    other: 'Wydatki inne (PLN)',
  };
  const colors: { [key: string]: string } = {
    entertainment: '#44CF6C',
    shopping: '#083D77',
    transport: '#FF6978',
    other: '#FFDC5E',
  };

  //--------------------------Wykres 2 - ZAKUPY SPOŻYWCZE OD KATEGORII
  const keyToLabel_products: { [key: string]: string } = {
    Alkohol: 'Wydatki na alkohol (PLN)',
    Pozywienie: 'Wydatki na pozywienie (PLN)',
    art_budowlany: 'Wydatki na artykuły budowlane (PLN)',
    art_gosp_dom: 'Wydatki na artykuły gospodarstwa domowego (PLN)',
    art_papier: 'Wydatki artykuły papiernicze (PLN)',
  };
  const colors_products: { [key: string]: string } = {
    Alkohol: '#44CF6C',
    Pozywienie: '#083D77',
    art_budowlany: '#FF6978',
    art_gosp_dom: '#FFDC5E',
    art_papier: '#7A7265',
  };

  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: 'descending',
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  };

  return (
    <div className="pr-10 pl-10 pt-4 w-[100%] flex flex-col items-center justify-center">
      <CustomizedSnackbar
        isError={isError}
        msg={msg}
        open={open}
        setOpen={setOpen}
      />
      <button
        className="p-2 text-white font-sans rounded-2xl mb-6 bg-[#2A2A2A]"
        onClick={handleOpenModal}
      >
        {' '}
        Zmień zakres analizy
      </button>
      <MyDatePickerModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        dateRange={dateRange}
        setDateRange={setDateRange}
        getData={getData}
      />

      <div className="flex flex-row w-[100%] justify-evenly">
        <div className="flex flex-col items-center w-[50%] mx-auto">
          <p className="text-xl font-serif text-center mb-3">
            PRZEBIEGI - WYDATKI OD KATEGORII
          </p>
          {!firstChartData ? (
            <Box sx={{ width: '90%', marginTop: -10 }}>
              <Skeleton animation="wave" sx={{ height: 400 }} />
            </Box>
          ) : (
            <LineChart
              xAxis={[
                {
                  label: 'Data',
                  dataKey: 'date',
                  valueFormatter: (v: any) =>
                    new Date(v).toISOString().split('T')[0],
                  min: firstChartData[0].date,
                  tickNumber: 4,
                  // max: endDate[endDate.length - 1].date
                },
              ]}
              series={Object.keys(keyToLabel).map((key) => ({
                dataKey: key,
                label: keyToLabel[key],
                color: colors[key],
                showMark: false,
                // ...stackStrategy,
              }))}
              dataset={firstChartData}
              {...customize}
            />
          )}
        </div>
        <div className="flex w-[50%] flex-col  items-center mx-auto">
          <p className="text-xl text-center font-serif mb-3">
            PODZIAŁ WYDATKÓW NA KATEGORIE
          </p>
          {prices ? (
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: prices.sumEntertainmentPrice,
                      label: 'Rozrywka',
                    },
                    {
                      id: 1,
                      value: prices.sumShopPrice,
                      label: 'Zakupy spozywcze',
                    },
                    {
                      id: 2,
                      value: prices.sumTransportPrice,
                      label: 'Transport',
                    },
                    { id: 3, value: prices.sumOtherPrice, label: 'Inne' },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          ) : (
            <Box
              sx={{
                marginLeft: 20,
                marginTop: 7,
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Skeleton variant="circular" width={180} height={180} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 8,
                  marginTop: 4,
                }}
              >
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
              </Box>
            </Box>
          )}
        </div>
      </div>

      <div className="flex flex-row w-[100%] justify-evenly">
        <div className="flex flex-col items-center w-[50%] mx-auto">
          <p className="text-xl text-center font-serif mb-3 mt-3">
            PRZEBIEGI - ZAKUPY SPOŻYWCZE OD KATEGORI
          </p>
          {!thirdChartData ? (
            <Box sx={{ width: '90%', marginTop: -10 }}>
              <Skeleton animation="wave" sx={{ height: 400 }} />
            </Box>
          ) : thirdChartData.length > 0 ? (
            <LineChart
              xAxis={[
                {
                  label: 'Data',
                  dataKey: 'date',
                  valueFormatter: (v: any) =>
                    new Date(v).toISOString().split('T')[0],
                  min: thirdChartData[0].date,
                  tickNumber: 4,
                  // max: endDate[endDate.length - 1].date
                },
              ]}
              series={Object.keys(keyToLabel_products).map((key) => ({
                dataKey: key,
                label: keyToLabel_products[key],
                color: colors_products[key],
                showMark: false,
                // ...stackStrategy,
              }))}
              dataset={thirdChartData}
              {...customize}
            />
          ) : (
            <text className="mt-10">Brak danych za wybrany okres</text>
          )}
        </div>
        <div className="flex w-[50%] flex-col  items-center mx-auto">
          <p className="text-xl text-center font-serif mt-3 mb-3">
            PODZIAŁ ZAKUPÓW SPOŻYWCZYCH NA KATEGORIE
          </p>
          {productsPrices ? (
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: productsPrices.Alkohol, label: 'Alkohol' },
                    {
                      id: 1,
                      value: productsPrices.Pozywienie,
                      label: 'Pozywienie',
                    },
                    {
                      id: 2,
                      value: productsPrices.art_budowlany,
                      label: 'Artykuły budowlane',
                    },
                    {
                      id: 3,
                      value: productsPrices.art_papier,
                      label: 'Artykuły papiernicze',
                    },
                    {
                      id: 4,
                      value: productsPrices.art_gosp_dom,
                      label: 'Artykuły gosp dom',
                    },
                  ],
                },
              ]}
              width={600}
              height={200}
            />
          ) : !thirdChartData ? (
            <Box
              sx={{
                marginLeft: 20,
                marginTop: 7,
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Skeleton variant="circular" width={180} height={180} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 8,
                  marginTop: 4,
                }}
              >
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
                <Skeleton animation="wave" sx={{ height: 20, width: 60 }} />
              </Box>
            </Box>
          ) : (
            <text className="mt-10">Brak danych za wybrany okres</text>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
