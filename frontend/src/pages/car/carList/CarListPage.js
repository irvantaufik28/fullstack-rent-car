import React, { useEffect } from 'react'
import CarList from './components/carList'
import FromFillter from '../../../components/fromfilter/fromFilter'
import Banner from '../../home/components/banner/Banner';
import Navbar from '../../../components/layouts/Navbar';
import Footer from '../../../components/layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getAllCars } from '../../../features/carSlice';
export default function FindCar() {

  const dispatch = useDispatch();
  const data = useSelector(carSelectors.selectAllCars);
  
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);


  const onFilter = (payload) => {
    dispatch(getAllCars(payload))
  }

  return (
    <>
      <Navbar />
      <Banner />
      <FromFillter onSubmit={onFilter} />
      <CarList cars={data.cars} />
      <Footer />
    </>
  )
}