import { Select, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";import React from 'react'
import TextField from "@mui/material/TextField/TextField";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Product,Universal } from "../../types";

type Props = {
  num:number;
  activeButton:string;
  setProducts:React.Dispatch<React.SetStateAction<Product[] | Universal[]>>;
  handleDeleteProduct:(num: number) => void;
  product: Product | Universal;
  list_categories: {
    id: number;
    category: string;
}[]
}

const OneProduct = ({num,setProducts,list_categories,handleDeleteProduct,product,activeButton}:Props) => {

  return (
    <div className="flex flex-col gap-2">

    <div className={`flex flex-1 flex-row ${activeButton==="Spozywcze" ? "justify-center" : "justify-start"} items-center gap-3`}>
      <p className="font-thin text-gray text-xl font-sans">{num}.</p>
    {activeButton==="Spozywcze" && 
    <FormControl sx={{ minWidth: 120, flexBasis:'23%'}}>
      <InputLabel id="demo-simple-select-helper-label">Kategoria</InputLabel>
      <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      label="Kategoria"
      style={{ maxHeight: "300px", overflowY: "auto" }}
      onChange={(event)=>setProducts((prevProd:any)=>prevProd.map((prod:any,index:number)=>{
        if (index !==num){
          return prod
        }
        else if(index===num){
          return {
            ...prod,
            category: event.target.value
          }
        }
      }))}
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
        </FormControl>}
    <TextField id="outlined-basic" label="Nazwa" variant="outlined" value={product.name} sx={{flexBasis:'23%'}}
       onChange={(event)=>setProducts((prevProd:any)=>prevProd.map((prod:any,index:number)=>{
        if (index !==num){
          return prod
        }
        else if(index===num){
          return {
            ...prod,
            name: event.target.value
          }
        }
      }))}   
    />
    <TextField
      sx={{flexBasis:'20%'}}
      className="w-24"
      label="cena"
      type="number"
      value={product.price}
      onChange={(event)=>setProducts((prevProd:any)=>prevProd.map((prod:any,index:number)=>{
        if (index !==num){
          return prod
        }
        else if(index===num){
          return {
            ...prod,
            price: event.target.value
          }
        }
      }))}
      />
      <TextField id="outlined-basic" label="Ilość" variant="outlined" value={product.amount} sx={{flexBasis:'23%'}}
       onChange={(event)=>setProducts((prevProd:any)=>prevProd.map((prod:any,index:number)=>{
        if (index !==num){
          return prod
        }
        else if(index===num){
          return {
            ...prod,
            amount: event.target.value
          }
        }
      }))}   
    />
      <DeleteRoundedIcon  sx={{ color: "grey", cursor:"pointer", marginLeft: activeButton === "Spozywcze" ? "0px" : "auto" }} onClick = {()=>handleDeleteProduct(num)}/>
  </div>
      <div className="h-[1px] w-[100%] bg-gray-400"></div>
      </div>
  )
}

export default OneProduct
