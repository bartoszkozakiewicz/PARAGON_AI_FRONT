import { axiosInstance } from "../axiosInstace"
const path = "http://localhost:5000/api/v1";

export const getData = async() =>{
    console.log("Get data")
    const data = await axiosInstance.get(`${path}/product/allData`).then(
        (res)=>{
            console.log(res.data)
            return res.data
        }).catch((e)=>console.error(e))
    console.log("X", data)
    return data
}

