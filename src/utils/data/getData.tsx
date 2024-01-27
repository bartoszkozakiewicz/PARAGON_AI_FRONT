import { axiosInstance } from '../axiosInstace';
const path = 'http://localhost:5000/api/v1';

export const getData = async () => {
  const data = await axiosInstance
    .get(`${path}/product/allData`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.error(e));
  return data;
};
