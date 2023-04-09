import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getAllCars } from '../../../features/carSlice';
import AdminCarList from './components/AdminCarList';

export default function AdminCarListPage() {
    const dispatch = useDispatch();
  const data = useSelector(carSelectors.selectAllCars);
  
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  return (
   
        <AdminCarList cars={data.cars}/>
   
    
  )
}
