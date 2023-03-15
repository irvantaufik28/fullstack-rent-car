import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CarList from '../components/car/carList'
import FromFillter from '../components/car/fromFillter'
import Banner from '../components/homepage/Banner'

export default function FindCar() {

  const [dataCar, setDataCar] = useState({
    cars: []
  });


  useEffect(() => {
    getCars();
  }, []);

  const getCars = async (params = {}) => {
    const response = await axios.get(
      `https://bootcamp-rent-cars.herokuapp.com/customer/v2/car`, {
      params
    }
    );
    console.log(params)

    setDataCar(response.data);
  };

  const onFilter = (payload) => {
      getCars(payload)
  }

  return (
    <>
      <Banner />
      <FromFillter onSubmit={onFilter} />
      <CarList data={dataCar} />
    </>
  )
}