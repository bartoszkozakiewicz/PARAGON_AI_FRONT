'use client'

import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { getData } from '@/utils/data/getData';
import { axiosInstance } from '@/utils/axiosInstace';
import Skeleton from '@mui/material/Skeleton';
import { useRouter } from 'next/navigation'

type ShoppingData = {
    date: string;
    id: number;
    price_sum: number;
    shop_name: string;
    userId: number;
  };
  
  type restData = {
    amount: number;
    date: string;
    id: number;
    price: number;
    name: string;
    userId: number;
  };

  type Data = {
    shoppingData: ShoppingData[];
    enterData: restData[];
    transportData: restData[];
    otherData: restData[];
  };
  
  type mergedData = 
    {
        id:number
        amount: number;
        date: Date;
        price: number;
        name: string;
        category:string
    }[]
  

  

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'category',
    headerName: 'Kategoria',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Nazwa',
    width: 150,
    editable: true,
  },
  {
    field: 'price',
    headerName: 'Cena',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'date',
    headerName: 'Data',//date
    type: 'date',
    width: 150,
    editable: true,
  },
  {
    field: 'amount',
    headerName: 'Ilość',
    type:'number',
    width: 110,
  },
];

const path = "http://localhost:5000/api/v1";

const Data_grid = () => {
    const router = useRouter()

    const [allData,setAllData] = useState<mergedData>([{id:0,category:"",name:"",price:0,date:new Date("2023-11-04"),amount:0}])
    const [selectedRows, setSelectedRows] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true)
    console.log("selected Rows",selectedRows)


    const handleDeleteElements = async ()=>{
        console.log("Usuwam dane")
        await axiosInstance.delete(`${path}/product/deleteElements`,{
            data: allData.filter((ele) => {
                return selectedRows.includes(ele.id);
              })   
        })
        .then(() => {
            setAllData((prevData) => {
              return prevData.filter((ele) => {
                return !selectedRows.includes(ele.id);
              });
            });
          })
          .catch((error) => {
            console.error("Błąd usuwania danych", error);
          });
    }

    useEffect(()=>{
        setIsLoading(true)
        const extractData = async()=>{
            const data:Data = await getData()
            let i = 0
            const shoppingData = data.shoppingData.map((shopData)=>{
                i+=1
                return{
                    realId:shopData.id,
                    id: i,
                    date: new Date(shopData.date),
                    price: shopData.price_sum,
                    name: shopData.shop_name,
                    category:"Shopping",
                    amount:1
                }
            })
            const enterData = data.enterData.map((enterData)=>{
                i+=1
                return{
                    realId:enterData.id,
                    id:i,
                    date: new Date(enterData.date),
                    price: enterData.price,
                    name: enterData.name,
                    category:"Entertainment",
                    amount:enterData.amount
                }
            })
            const transportData = data.transportData.map((transpData)=>{
                i+=1
                return{
                    realId:transpData.id,
                    id:i,
                    date: new Date(transpData.date),
                    price: transpData.price,
                    name: transpData.name,
                    category:"Transport",
                    amount:transpData.amount
                }
            })
            const otherData = data.otherData.map((otherData)=>{
                i+=1
                return{
                    realId:otherData.id,
                    id:i,
                    date: new Date(otherData.date),
                    price: otherData.price,
                    name: otherData.name,
                    category:"Other",
                    amount:otherData.amount
                }
            })
            const mergedData = shoppingData.concat(enterData, transportData, otherData);
            setAllData(mergedData)
            setIsLoading(false)
        }
        extractData()
    },[])


    return (
        <div className='flex flex-col justify-center items-center'>
          {isLoading ? (
            <Skeleton variant="rounded" width={"100%"} height={410} animation="wave"/>
          ) : (
            <div className='flex flex-col justify-center items-center'>
              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={allData}
                  columns={columns}
                  onRowClick = {(params)=>{
                    const rowData = params.row
                    console.log("rowData",rowData)
                    if (rowData.category === "Shopping"){
                      console.log("Przechodze do shopping")
                      router.push(`/edit-single-paragon?shopId=${rowData.realId}&&shopName=${rowData.name}&&shopDate=${rowData.date}`)
                    }
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                    sorting: {
                      sortModel: [{ field: "date", sort: "desc" }],
                    },
                  }}
                  pageSizeOptions={[10]}
                  checkboxSelection
                  onRowSelectionModelChange={(newSelection) => {
                    setSelectedRows(newSelection);
                  }}
                  disableRowSelectionOnClick
                />
              </Box>
              <button
                
                className={`rounded-xl ${
                  selectedRows.length === 0 ? "bg-gray-400 cursor-auto" : "bg-blue-500"
                } p-2 text-white font-sans mt-8 w-[30%]`}
                onClick={handleDeleteElements}
              >
                Usuń zaznaczone elementy
              </button>
            </div>
          )}
        </div>
      );
      
}

export default Data_grid
