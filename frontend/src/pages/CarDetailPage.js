import React, { useEffect, useState } from 'react'
import Banner from '../components/homepage/Banner'
import CarDetail from '../components/car/carDetail'
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CarDetailPage() {
  const [dataCar, setDataCar ] = useState({})

  const { id } = useParams();

  useEffect(()=> { 
    const getCarById = async() => {
      const response = await axios.get(`https://bootcamp-rent-cars.herokuapp.com/customer/car/${id}`)
      setDataCar(response.data)
    }
    getCarById();  
  },[id])

  return (
    <>
      <Banner />
      <CarDetail data={dataCar}/>
    </>
  )
}
