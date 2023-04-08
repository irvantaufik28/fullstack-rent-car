import React, { useEffect } from 'react'
import Banner from '../../home/components/banner/Banner'; 
import CarDetail from './components/carDetail'
import { useParams } from 'react-router-dom';
import Navbar from "../../../components/layouts/Navbar";
import Footer from "../../../components/layouts/Footer";
import FromFilterDetail from '../../../components/fromfilter/fromFilterDetail';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getCarById } from '../../../features/carSlice';

export default function CarDetailPage() {

  const { id } = useParams();

  const dispatch = useDispatch();
  const car = useSelector(carSelectors.selectCarById);
  
  useEffect(() => {
    dispatch(getCarById(id));
    
  }, [dispatch]);


  return (
    <>
    <Navbar />
      <Banner />
      <FromFilterDetail data={car} />
      <CarDetail data={car}/>
      <Footer />
    </>
  )
}
