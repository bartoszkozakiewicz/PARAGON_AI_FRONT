"use client";

import TextField from "@mui/material/TextField/TextField";
import React from "react";
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <p className="text-lg font-semibold font-poppins mb-6">Uzupełnij swoją bazę danych o zaległe wydatki</p>
      <div className="flex flex-col gap-3 p-6 shadow-custom rounded-lg w-[70%] h-[60%]">
        <div className="flex flex-row gap-4 justify-center">
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>
        <div className="flex flex-row justify-center gap-3">
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
  );
};

export default page;
