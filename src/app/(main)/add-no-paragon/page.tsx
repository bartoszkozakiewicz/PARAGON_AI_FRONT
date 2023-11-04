"use client";

import TextField from "@mui/material/TextField/TextField";
import React, { useState, useRef,useEffect, ButtonHTMLAttributes } from "react";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import OneProduct from "@/components/add-products-section/one_products";
import { Product,Shop,Universal } from "../../../types/";
import AlertSave from "@/components/add-products-section/alertSave";
import { axiosInstance } from "@/utils/axiosInstace";

const page = () => {
  const path = "http://localhost:5000/api/v1";

  const b1Ref = useRef<HTMLButtonElement | null>(null)
  const b2Ref = useRef<HTMLButtonElement | null>(null)
  const b3Ref = useRef<HTMLButtonElement | null>(null)
  const b4Ref = useRef<HTMLButtonElement | null>(null)

  const [title,setTitle] = useState<string>("PRODUKTY")  
  const [open, setOpen] = useState<boolean>(false);
  const [alertAccepted, setAlertAccepted] = useState<boolean>(true)

  const [saveEnabled, setSaveEnabled] = useState<boolean>(true)

  const [actualData, setActualData] = useState<Product[] | Universal[]>([{name:"",price:0,amount:0,category:""}])

  const [shop,setShop] = useState<Shop>({name:"",date:""})
  const [bPos,setBPos] = useState({b1_x:0,b1_y:0,b2_x:0,b3_x:0,b4_x:0})
  const [activeButton, setActiveButton] = useState<any>("Spozywcze");
  const [nextButton, setNextButton] = useState<string>("Spozywcze");
  const [x,setX] = useState("15px")
  const list_categories = [
    { id: 1, category: "Pozywienie" },
    { id: 2, category: "Art. budowlany" },
    { id: 3, category: "Art. chemiczny" },
    { id: 4, category: "Art. papierniczy" },

  ];

    // -------------------------------------------------------------------
  const settingButtonsTransition = (buttonName:String) =>{
    setActiveButton(buttonName)
    setActualData([{name:"",price:0,amount:0,category:""}])

    if(buttonName==="Spozywcze"){
      setTitle("PRODUKTY")
      setX(`${15}px`)
    } 
    else if(buttonName==="Rozrywka"){
      setTitle("AKTYWNOŚCI")
      setX(`${bPos.b2_x - bPos.b1_x+15}px`)
    }
    else if(buttonName==="Transport"){
      setTitle("PODRÓŻE")
      setX(`${bPos.b3_x - bPos.b1_x+15}px`)
    }
    else if(buttonName==="Pozostałe"){
      setTitle("SPERSONALIZOWANE WYDATKI")
      setX(`${bPos.b4_x - bPos.b1_x+15}px`)
    }
  }

  const handleButtonClick = (buttonName:string) => {
    if(saveEnabled){
      setNextButton(buttonName)
      setOpen(true)
      }
    else{
      settingButtonsTransition(buttonName)
    }
    }


  const handleAddElement = () =>{
    if(activeButton==="Spozywcze"){
      setActualData((prevProducts:any)=>{
        const newProducts = [...prevProducts,{name:"",price:0,amount:0,category:""} ];
        return newProducts;
      })
    }else{
      setActualData((prevProducts:any)=>{
        const newProducts = [...prevProducts,{name:"",price:0,amount:0} ];
        return newProducts;
      }) 
    }
  }


  const handleDeleteProduct = (num: number) => {
    console.log("Usuwam produkt", num);
    setActualData((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(num, 1);
      return updatedProducts;
    });
  };

  const handleSendData = async() =>{
    console.log("Send data")
    let sumPrice = 0
    actualData.forEach((prod)=>{
      sumPrice+=Number(prod.price)
    })
    console.log(sumPrice)
    switch(activeButton){
      case "Spozywcze":
        console.log("Spozywcze")
        await axiosInstance.post(`${path}/product/addElement?cat=${activeButton}`,{sumPrice,actualData,shop}).then((res:any)=>console.log(res)).catch((e:any)=>console.log(e))
        break;
      case "Rozrywka":
        console.log("Rozrywka")
        await axiosInstance.post(`${path}/product/addElement?cat=${activeButton}`,actualData).then((res:any)=>console.log(res)).catch((e:any)=>console.log(e))
        break;
      case "Transport":
        console.log("Transport")
        await axiosInstance.post(`${path}/product/addElement?cat=${activeButton}`,actualData).then((res:any)=>console.log(res)).catch((e:any)=>console.log(e))
        break;
      case "Pozostałe":
        console.log("Pozostałe")
        await axiosInstance.post(`${path}/product/addElement?cat=${activeButton}`,actualData).then((res:any)=>console.log(res)).catch((e:any)=>console.log(e))
        break;
    }
  }

  const isDataEqual = () =>{
    console.log("Check data equality to turn on/off button")
  }

  // -------------------------------------------------------------------


  useEffect(()=>{
      setBPos((prevData:any) => {
        if (b1Ref.current && b2Ref.current && b3Ref.current  && b4Ref.current){
          return {
            ...prevData,
            b1_x:b1Ref.current.getBoundingClientRect().x,
            b1_y:b1Ref.current.getBoundingClientRect().y,
            b2_x:b2Ref.current.getBoundingClientRect().x,
            b3_x:b3Ref.current.getBoundingClientRect().x,
            b4_x:b4Ref.current.getBoundingClientRect().x,
          }
        }
      })
    }
  ,[])
  console.log("XXXxxxx",actualData)

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <AlertSave nextButton={nextButton} open={open} setOpen={setOpen}  setAlertAccepted={setAlertAccepted} settingButtonsTransition={(nextButton)=>settingButtonsTransition(nextButton)}/>
      <p className="text-lg font-semibold font-poppins mb-6 mt-6">Uzupełnij swoją bazę danych o zaległe wydatki</p>
      <div className="flex flex-col items-center gap-3 w-[70%] h-[100%]">
      <div className="space-x-4 relative w-[100%] mt-10">
      <div
          className="h-[2px] min-w-[75px] bg-blue-500 transition-transform transform-gpu absolute bottom-0"
          style={{    width: "20px", transform: `translateX(${x})`, transition:"transform 0.4s"}}></div>

      <button ref={b1Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Spozywcze")}>
          Zakupy S
        </button>
        <button ref={b2Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Rozrywka")}>
          Rozrywka
        </button>
        <button ref={b3Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Transport")} >
          Transport
        </button>
        <button ref={b4Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Pozostałe")} >
          Pozostałe
        </button>
      </div>

      <div className="flex flex-col gap-3 p-6 shadow-custom rounded-lg w-[100%] min-h-[500px] max-h-[500px] items-center">
        <div className="flex flex-row items-left w-[100%] gap-4 justify-start">
          {activeButton==="Spozywcze" && <TextField id="outlined-basic" label="Nazwa Sklepu" variant="outlined" onChange={((e)=>setShop((prevData:Shop)=>({...prevData,name:e.target.value})))}/>}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={((date:any)=>setShop((prevData:Shop)=>({...prevData,date:date.format("YYYY-MM-DD")})))}/>
          </LocalizationProvider>
          <button onClick={handleSendData} className={`ml-auto rounded-xl p-3 text-white ${saveEnabled ? "bg-blue-500" : "bg-gray-400 cursor-auto"}  font-sans`}>DODAJ</button>
        </div>
        <p className="font-semibold font-sans mt-3">{title}</p>
        <div className="flex flex-col gap-3 max-h-[300px] p-6 overflow-y-auto">

          {actualData.map((product:any,index:number)=>(
            <OneProduct activeButton={activeButton}  key={index} num={index}  list_categories={list_categories} 
              product={product} setProducts={setActualData}  handleDeleteProduct={(num:number)=>handleDeleteProduct(num)}
            />
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            color="primary"
            onClick = {handleAddElement}
            sx={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              minWidth: "40px",
              minHeight: "40px",
            }}
            >
            <AddIcon />
          </Button>
        </div>
            </div>
      </div>
    </div>
  );
};

export default page;
