import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AddCar from '../../../components/admin/car/AddCar'
import { useDispatch } from 'react-redux'
import { adminAddCar } from '../../../features/carSlice'
import { addImageCar } from '../../../features/carMediaSlice' 

export default function AdminAddCar() {
  
  const dispatch = useDispatch()
  
  const addCar = async (payload) => {
    try {
      const response = await dispatch(adminAddCar(payload)).unwrap();
      return response
    } catch (err) {
      console.log(err)
    }
  }

  const addImagesCar = async (payload) => {
    try {
      
      const formData = new FormData();
      formData.append("car_id", payload.car_id);

      payload.files.forEach((file) => {
        formData.append("files", file);
      });

      dispatch(addImageCar(formData))
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
     
     const response = await addCar(carData);
      if (formData.files.length >= 1) {
        addImagesCar({
          car_id: response.id,
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
