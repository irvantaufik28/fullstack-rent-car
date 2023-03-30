import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CarList from '../components/carlist/carList'
import config from "../config/index"
import FromFillter from '../components/fromfilter/fromFilter'
import Banner from '../components/homepage/banner/Banner'
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
export default function FindCar() {

  const [dataCar, setDataCar] = useState({
    cars: []
  });


  useEffect(() => {
    getCars();
  }, []);

  const apiUrl = config.apiBaseUrl
  const getCars = async (params = {}) => {
    const response = await axios.get(
      apiUrl + "/customer/v2/car", {
      params
    }
    );
    setDataCar(response.data);
  };

  const onFilter = (payload) => {
    getCars(payload)
    console.log(typeof payload.maxPrice)
  }


  return (
    <>
      <Navbar />
      <Banner />
      <FromFillter onSubmit={onFilter} />
      <CarList data={dataCar} />
      <Footer />
    </>
  )
}