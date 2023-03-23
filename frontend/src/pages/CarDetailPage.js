import React, { useEffect, useState } from 'react'
import Banner from '../components/homepage/banner/Banner'
import CarDetail from '../components/cardetail/carDetail'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import config from "../config/index"
import FromFilterDetail from '../components/fromfilter/fromFilterDetail';

export default function CarDetailPage() {
  const [dataCar, setDataCar ] = useState({})

  const { id } = useParams();

  useEffect(()=> { 
    const getCarById = async() => {
      const apiUrl = config.apiBaseUrl + `/customer/car/${id}`
      const response = await axios.get(apiUrl)
      setDataCar(response.data)
    }
    getCarById();  
  },[id])

  return (
    <>
    <Navbar />
      <Banner />
      <FromFilterDetail data={dataCar} />
      <CarDetail data={dataCar}/>
      <Footer />
    </>
  )
}
