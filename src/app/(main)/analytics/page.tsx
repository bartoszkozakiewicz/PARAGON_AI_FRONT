"use client";

import { axiosInstance } from "@/utils/axiosInstace";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from '@mui/x-charts/PieChart';
import { useEffect, useState } from "react";


const page = () => {
  const path = "http://localhost:5000/api/v1";
  const [firstChartData,setFirstChartData] = useState<any>(null)//[{date:"",shopping:0,other:0,enterntainment:0,transport:0}]
  const [secondChartData,setSecondChartData] = useState<any>()
  const [thirdChartData,setThirdChartData] = useState<any>()
  const [prices, setPrices] = useState<any>(null)
  const [productsPrices, setProductsPrices] = useState<any>(null)

  

  const [loading,setLoading] = useState(true)

  const getData = async() =>{
    const allDataNeeded = await axiosInstance.get(`${path}/product/neededData?date1=x&&date2=x`)
      .then(
        res=>{
          console.log("HALO RES-END:",res.data.endData)
          console.log("HALO RES-PRODUCTS:",res.data.endProducts)
          res.data.endData.map((ele:any)=>{
            ele.date = new Date(ele.date)
            return ele
          })
          res.data.endProducts.map((ele:any)=>{
            ele.date = new Date(ele.date)
            return ele
          })

          setFirstChartData(res.data.endData)
          setThirdChartData(res.data.endProducts)
          setPrices({
            sumEnertainmentPrice:res.data.sumEnertainmentPrice,
            sumOtherPrice:res.data.sumOtherPrice,
            sumShopPrice:res.data.sumShopPrice,
            sumTransportPrice:res.data.sumTransportPrice,
          })
          setProductsPrices(res.data.sumProductPrices)
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


  //--------------------------Wykres 1 - WYDATKI OD KATEGORII
  const keyToLabel: { [key: string]: string } = {
    entertainment: "Wydatki na rozrywkę (PLN)",
    shopping: "Wydatki na zakupy spozywcze (PLN)",
    transport: "Wydatki na transport (PLN)",
    other: "Wydatki inne (PLN)",

  };
  const colors: { [key: string]: string } = {
    entertainment: "#44CF6C",
    shopping: "#083D77",
    transport: "#FF6978",
    other: "#FFDC5E",
  };

  //--------------------------Wykres 2 - ZAKUPY SPOŻYWCZE OD KATEGORII
  const keyToLabel_products: { [key: string]: string } = {
    Alkohol: "Wydatki na alkohol (PLN)",
    Pozywienie: "Wydatki na pozywienie (PLN)",
    art_budowlany: "Wydatki na artykuły budowlane (PLN)",
    art_gosp_dom: "Wydatki na artykuły gospodarstwa domowego (PLN)",
    art_papier: "Wydatki artykuły papiernicze (PLN)",
  };
  const colors_products: { [key: string]: string } = {
    Alkohol: "#44CF6C",
    Pozywienie: "#083D77",
    art_budowlany: "#FF6978",
    art_gosp_dom: "#FFDC5E",
    art_papier: "#7A7265"
  };

  // const stackStrategy = {
  //   stack: "total",
  //   area: false,
  //   stackOffset: "none", // To stack 0 on top of others
  // } as const;

  const customize = {
    height: 300,
    legend: { hidden: true },
    margin: { top: 5 },
    stackingOrder: "descending",
  };
  console.log("HALO",firstChartData,"third",thirdChartData)

  return (
    <div className="p-10 w-[100%] flex flex-col items-center justify-center">
      <div className="flex flex-row w-[100%] justify-evenly">
        <div className="flex flex-col items-center w-[50%] mx-auto">
        <p className="text-xl font-serif text-center mb-3">PRZEBIEGI - WYDATKI OD KATEGORII</p>
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
                min: firstChartData[0].date,
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
                  { id: 0, value: prices.sumEntertainmentPrice, label: 'Rozrywka' },
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
        <div className="flex flex-col items-center w-[50%] mx-auto">
          <p className="text-xl text-center font-serif mb-3 mt-3">PRZEBIEGI - ZAKUPY SPOŻYWCZE OD KATEGORI</p>
          {!thirdChartData ? 
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
                min: thirdChartData[0].date,
                tickNumber:4,
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
          }
        </div>
        <div className="flex w-[50%] flex-col  items-center mx-auto">
          <p className="text-xl text-center font-serif mt-3 mb-3">PODZIAŁ ZAKUPÓW SPOŻYWCZYCH NA KATEGORIE</p>
          {productsPrices ? 
        <PieChart
            series={[
              {
                data: [
                  { id: 0, value: productsPrices.Alkohol, label: 'Alkohol' },
                  { id: 1, value: productsPrices.Pozywienie, label: 'Pozywienie' },
                  { id: 2, value: productsPrices.art_budowlany, label: 'Artykuły budowlane' },
                  { id: 3, value: productsPrices.art_papier, label: 'Artykuły papiernicze' },
                  { id: 4, value: productsPrices.art_gosp_dom, label: 'Artykuły gosp dom' },
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
    </div>
  );
};

export default page;
