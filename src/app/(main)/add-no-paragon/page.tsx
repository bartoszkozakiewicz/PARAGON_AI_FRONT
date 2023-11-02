"use client";

import TextField from "@mui/material/TextField/TextField";
import React, { useState, useRef,useEffect, ButtonHTMLAttributes } from "react";
import { Select, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const page = () => {
  const list_categories = [
    { id: 1, category: "Zakupy" },
    { id: 2, category: "Rozrywka" },
    { id: 3, category: "Transport" },
  ];
  const b1Ref = useRef<HTMLButtonElement | null>(null)
  const b2Ref = useRef<HTMLButtonElement | null>(null)
  const b3Ref = useRef<HTMLButtonElement | null>(null)

  const [bPos,setBPos] = useState({b1_x:0,b1_y:0,b2_x:0,b3_x:0})
  const [activeButton, setActiveButton] = useState<any>("Zakupy");
  const [x,setX] = useState("15px")
  const handleButtonClick = (buttonName:string) => {
    setActiveButton(buttonName);
    if(buttonName==="Zakupy"){
      setX(`${15}px`)
    } 
    else if(buttonName==="Rozrywka"){
      setX(`${bPos.b2_x - bPos.b1_x+15}px`)
    }
    else if(buttonName==="Inne"){
      setX(`${bPos.b3_x - bPos.b1_x+15}px`)
    }
  };

  useEffect(()=>{
      setBPos((prevData:any) => {
        if (b1Ref.current && b2Ref.current && b3Ref.current){
          return {
            ...prevData,
            b1_x:b1Ref.current.getBoundingClientRect().x,
            b1_y:b1Ref.current.getBoundingClientRect().y,
            b2_x:b2Ref.current.getBoundingClientRect().x,
            b2_y:b2Ref.current.getBoundingClientRect().y,
            b3_x:b3Ref.current.getBoundingClientRect().x,
            b3_y:b3Ref.current.getBoundingClientRect().y,
          }
        }
      })
    }
  ,[])

  console.log(bPos) //className={`border-b-2 ${activeButton === "Zakupy" ? "border-blue-500" : ""}`}
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <p className="text-lg font-semibold font-poppins mb-6">Uzupełnij swoją bazę danych o zaległe wydatki</p>
      <div className="flex flex-col items-center justify-center gap-3 w-[70%] h-[100%]">
      <div className="space-x-4 relative w-[100%]">
      <div
          className="h-[2px] min-w-[75px] bg-blue-500 transition-transform transform-gpu absolute bottom-0"
          style={{    width: "20px", transform: `translateX(${x})`, transition:"transform 0.4s"}}></div>

      <button ref={b1Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Zakupy")}>
          Zakupy
        </button>
        <button ref={b2Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Rozrywka")}>
          Rozrywka
        </button>
        <button ref={b3Ref} className="w-[100px] text-start" onClick={() => handleButtonClick("Inne")} >
          Inne
        </button>
      </div>


      <div className="flex flex-col gap-3 p-6 shadow-custom rounded-lg w-[100%] h-[60%] items-center">
        <div className="flex flex-row items-left w-[100%] gap-4 justify-start">
          {/* <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Kategoria</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Kategoria"
            //   value={selectedOption}
            //   onChange={handleOptionChange}
            style={{ maxHeight: "300px", overflowY: "auto" }}
            >
            {list_categories &&
              list_categories.map((item: any) => (
                <MenuItem
                key={item.id}
                style={{
                  whiteSpace: "normal", // Zapobieganie zawijaniu tekstu
                  overflow: "hidden", // Ukrywanie tekstu, który nie mieści się
                  textOverflow: "ellipsis", // Dodawanie "..." na końcu tekstu
                  maxWidth: "100%", // Ograniczenie szerokości dla MenuItem
                }}
                value={`${item.category}`}
                >
                <p className="whitespace-normal overflow-hidden truncate min-w-full">{item.category}</p>
                </MenuItem>
                ))}
                </Select>
              </FormControl> */}
          <TextField id="outlined-basic" label="Nazwa Sklepu" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
        <p className="font-semibold font-sans">PRODUKTY</p>
        <div className="flex flex-row justify-center gap-3">
                    <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Kategoria</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Kategoria"
            //   value={selectedOption}
            //   onChange={handleOptionChange}
            style={{ maxHeight: "300px", overflowY: "auto" }}
            >
            {list_categories &&
              list_categories.map((item: any) => (
                <MenuItem
                key={item.id}
                style={{
                  whiteSpace: "normal", // Zapobieganie zawijaniu tekstu
                  overflow: "hidden", // Ukrywanie tekstu, który nie mieści się
                  textOverflow: "ellipsis", // Dodawanie "..." na końcu tekstu
                  maxWidth: "100%", // Ograniczenie szerokości dla MenuItem
                }}
                value={`${item.category}`}
                >
                <p className="whitespace-normal overflow-hidden truncate min-w-full">{item.category}</p>
                </MenuItem>
                ))}
                </Select>
              </FormControl>
          <TextField id="outlined-basic" label="Nazwa" variant="outlined" />
          <TextField
            className="w-24"
            label="cena"
            type="number"
            // value={val}
            // onChange={handleInputChange}
            />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            variant="outlined"
            color="primary"
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
