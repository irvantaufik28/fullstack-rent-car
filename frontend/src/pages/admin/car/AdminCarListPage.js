import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getAllCars } from '../../../features/carSlice';
import AdminCarList from './components/AdminCarList';
import SideBar from '../../../components/layouts/SideBar';
export default function AdminCarListPage() {
    const dispatch = useDispatch();
  const data = useSelector(carSelectors.selectAllCars);
  
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
console.log(data)
  return (
    <SideBar>
        <AdminCarList cars={data.cars}/>
    </SideBar>
    
  )
}
