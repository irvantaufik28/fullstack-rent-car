import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AddCar from '../../../components/admin/car/AddCar'
// import { useDispatch } from 'react-redux'
// import { adminAddCar } from '../../../features/carSlice'
import axios from 'axios'
import config from '../../../config'


export default function AdminAddCar() {
  
  // const dispatch = useDispatch()
  
  // const addCar = async (payload) => {
  //   try {
  //  dispatch(adminAddCar(payload))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const addImagesCar = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const apiUrl = config.apiBaseUrl;

      const formData = new FormData();
      formData.append("car_id", payload.car_id);

      payload.files.forEach((file) => {
        formData.append("files", file);
      });

      await axios.post(apiUrl + "/car-media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitAddCar = async (formData) => {
    try {
      const { name, price, category } = formData;

      const carData = {
        name: name,
        price: price,
        category: category,
      };

      const response = await axios.post(config.apiBaseUrl + "/car", carData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     
      if (formData.files.length >= 1) {
        addImagesCar({
          car_id: response.data.id,
          files: formData.files,
        });

      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>

    <SideBarAdmin>
        <NavBarAdmin>
         <AddCar  onSubmit={onSubmitAddCar}/>
        </NavBarAdmin>
    </SideBarAdmin>

</>
  )
}
