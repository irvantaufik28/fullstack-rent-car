import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getAllCars, getCarById } from '../../features/carSlice';

export default function UpdateCarPage() {
  const dispatch = useDispatch();
  const cars = useSelector(carSelectors.selectAllCars);
  
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  console.log(cars);
  return (
    <div>
      {/* tampilkan informasi update car */}
    </div>
  );
}