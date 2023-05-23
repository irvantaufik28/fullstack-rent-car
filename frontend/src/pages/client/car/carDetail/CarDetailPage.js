import React, { useEffect } from 'react'
import Banner from '../../home/components/banner/Banner'; 
import CarDetail from './components/carDetail'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../../../components/layouts/Navbar";
import Footer from "../../../../components/layouts/Footer";
import FromFilterDetail from '../../../../components/fromfilter/fromFilterDetail';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getCarById } from '../../../../features/carSlice';
import Calendar from '../../../../components/ui/Calendar';
import { format } from 'date-fns';
import { setOrder } from '../../../../features/orderSlice';

export default function CarDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams();

  const dispatch = useDispatch();
  const car = useSelector(carSelectors.selectCarById);
  
  useEffect(() => {
    dispatch(getCarById(id));
    
  }, []);
  
  
  const handleData = (payload) => {
    const formattedDate = (date) => {
      return format(date, "yyyy-MM-dd");
    };
    let requestOrder = {
      start_date_at: formattedDate(payload[0]),
      finish_date_at: formattedDate(payload[1]),
      car_id: car?.id
    };

    const newData = {...requestOrder,...car}
    localStorage.setItem('dayRent',JSON.stringify(newData))
    // dispatch(setOrder(requestOrder))
     localStorage.setItem('car', JSON.stringify(newData))
   
     
  };

  return (
    <>
    <Navbar />
      <Banner />
      <FromFilterDetail data={car} />
      <CarDetail data={car}>
        <Calendar onSubmit={handleData} />
      </CarDetail>
      <Footer />
    </>
  )
}
