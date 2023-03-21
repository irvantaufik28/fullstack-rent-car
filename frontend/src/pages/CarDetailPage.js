import React, { useEffect, useState } from 'react'
import Banner from '../components/homepage/Banner'
import CarDetail from '../components/car/carDetail'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import config from "../config/index"

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
      <CarDetail data={dataCar}/>
      <Footer />
    </>
  )
}
