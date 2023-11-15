"use client";

import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axiosInstance } from "@/utils/axiosInstace";
import { PieChart } from '@mui/x-charts/PieChart';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';


const page = () => {
  const path = "http://localhost:5000/api/v1";
  const [firstChartData,setFirstChartData] = useState<any>(null)//[{date:"",shopping:0,other:0,enterntainment:0,transport:0}]
  const [secondChartData,setSecondChartData] = useState<any>()
  const [thirdChartData,setThirdChartData] = useState<any>()
  const [prices, setPrices] = useState<any>(null)

  const [loading,setLoading] = useState(true)

  const getData = async() =>{
    const allDataNeeded = await axiosInstance.get(`${path}/product/neededData?date1=x&&date2=x`)
      .then(
        res=>{
          console.log("HALO RES:",res.data)
          console.log("HALO RES-END:",res.data.endData)
          res.data.endData.map((ele:any)=>{
            ele.date = new Date(ele.date)
            return ele
          })
          setFirstChartData(res.data.endData)
          setPrices({
            sumEnertainmentPrice:res.data.sumEnertainmentPrice,
            sumOtherPrice:res.data.sumOtherPrice,
            sumShopPrice:res.data.sumShopPrice,
            sumTransportPrice:res.data.sumTransportPrice,
          })
        }
      )
      .catch((err)=>console.log(err))


  }

  useEffect(()=>{
    const fetch = async()=>{
      await getData()
    }
    fetch()
    setLoading(false)
  },[])

  const endDate = [
    {
      date: new Date("2023-11-03T00:00:00.000Z"),
      entertainment: 0,
      other: 0,
      shopping: 28,
      transport: 0,
    },
    {
      date: new Date("2023-11-04T00:00:00.000Z"),
      entertainment: 20,
      other: 40,
      shopping: 58,
      transport: 16,
    },
  ]

  const worldElectricityProduction = [
    {
      country: "World",
      year: 2022,
      other: 99.74,
      bio: 677.57,
      solar: 1289.27,
      wind: 2139.23,
      hydro: 4326.76,
      nuclear: 2610.04,
      oil: 884.98,
      gas: 6309.46,
      coal: 10190.71,
    },
  ];

  const keyToLabel: { [key: string]: string } = {
    entertainment: "Wydatki na rozrywkę (PLN)",
    shopping: "Wydatki na zakupy spozywcze (PLN)",
    transport: "Wydatki na transport (PLN)",
    other: "Wydatki inne (PLN)",

  };

  const colors: { [key: string]: string } = {
    entertainment: "#1976D2",
    shopping: "#03fc66",
    transport: "#FF4081",
    other: "lightblue",
  };

  const stackStrategy = {
    stack: "total",
    area: false,
    stackOffset: "none", // To stack 0 on top of others
  } as const;

  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: "descending",
  };
  console.log(firstChartData, "first")
  return (
    <div className="p-10 w-[100%] flex flex-col items-center justify-center">
      <div className="flex flex-row w-[100%] justify-evenly">
        <div className="flex flex-col items-center w-[50%] mx-auto">
        <p className="text-xl font-serif text-center mb-3">PRZEBIEGI WYDATKÓW Z PODZIAŁEM NA KATEGORIE</p>
          {!firstChartData ? 
            <Box sx={{width: "80%" }}>
              <Skeleton animation="wave" sx={{height:300}}/>
            </Box>
          :
            <LineChart
            xAxis={[
              {
                label: "Data",
                dataKey: "date",
                valueFormatter: (v: any) => new Date(v).toISOString().split('T')[0],
                min: endDate[0].date,
                tickNumber:4,
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
          }
        </div>
        <div className="flex w-[50%] flex-col  items-center mx-auto">
          <p className="text-xl text-center font-serif mb-3">PODZIAŁ WYDATKÓW NA KATEGORIE</p>
          {prices ? 
        <PieChart
            series={[
              {
                data: [
                  { id: 0, value: prices.sumEnertainmentPrice, label: 'Rozrywka' },
                  { id: 1, value: prices.sumShopPrice, label: 'Zakupy spozywcze' },
                  { id: 2, value: prices.sumTransportPrice, label: 'Transport' },
                  { id: 3, value: prices.sumOtherPrice, label: 'Inne' },
                ],
              },
            ]}
            width={600}
            height={200}
            />: 
            <Box sx={{width: "80%" }}>
              <Skeleton animation="wave" sx={{height:300}}/>
            </Box>
          }
        </div> 
      </div>

      <div className="flex flex-row w-[100%] justify-evenly">
        <div className="mt-10 flex items-center justify-center">X</div>
        <div className="mt-10 flex items-center justify-center">Y</div>

      </div>
    </div>
  );
};

export default page;
