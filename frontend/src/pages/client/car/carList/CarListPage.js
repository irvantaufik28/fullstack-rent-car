import React, { useEffect } from 'react'
import CarList from './components/carList'
import FromFillter from '../../../../components/fromfilter/fromFilter'
import Banner from '../../../client/home/components/banner/Banner';
import Navbar from '../../../../components/layouts/Navbar';
import Footer from '../../../../components/layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getAllCars } from '../../../../features/carSlice';
import LoadingSpiner from '../../../../components/ui/LoadingSpiner';

export default function FindCar() {
  const dispatch = useDispatch();
  const loading = useSelector(carSelectors.loading);
  const data = useSelector(carSelectors.selectAllCars);
useEffect(() => {
    dispatch(getAllCars());
  }, []);

  const onFilter = (payload) => {
    dispatch(getAllCars(payload));
  };

  return (
    <>
      <Navbar />
      <Banner />
      <FromFillter onSubmit={onFilter} />
      {loading ? (
        <LoadingSpiner />
      ) : (
        <>{data.cars !== undefined && <CarList cars={data.cars} />}</>
      )}
      <Footer />
    </>
  );
}