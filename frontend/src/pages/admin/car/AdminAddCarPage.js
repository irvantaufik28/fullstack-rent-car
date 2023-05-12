import React, { useState } from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AddCar from '../../../components/admin/car/AddCar'
import { useDispatch, useSelector } from 'react-redux'
import { adminAddCar } from '../../../features/carSlice'
import { addImageCar } from '../../../features/carMediaSlice' 
import { carMediaSelectors } from '../../../features/carMediaSlice'
import { useNavigate } from 'react-router-dom'

export default function AdminAddCarPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(carMediaSelectors.loading);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const addCar = async (payload) => {
    try {
      const response = await dispatch(adminAddCar(payload)).unwrap();
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const addImagesCar = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("car_id", payload.car_id);

      payload.files.forEach((file) => {
        formData.append("files", file);
      });

      dispatch(addImageCar(formData));
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitAddCar = async (formData) => {
    try {
      // setIsSubmitting(true);
      const { name, price, category } = formData;

      const carData = {
        name: name,
        price: price,
        category: category,
      };

      const response = await addCar(carData);

      if (formData.files.length >= 1) {
        await addImagesCar({
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
    <NavBarAdmin />
    <SideBarAdmin>
      {isLoading ? (<p>loading...</p>) : (
        <AddCar onSubmit={onSubmitAddCar} />
      )}
      {!isLoading && (
      navigate("/admin/carlist")
    )}
    </SideBarAdmin>
  </>
  )
}