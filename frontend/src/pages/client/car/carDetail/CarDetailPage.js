import React, { useEffect, useState } from 'react'
import Banner from '../../home/components/banner/Banner';
import CarDetail from './components/carDetail'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from "../../../../components/layouts/Navbar";
import Footer from "../../../../components/layouts/Footer";
import FromFilterDetail from '../../../../components/fromfilter/fromFilterDetail';
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, getCarById } from '../../../../features/carSlice';
import Calendar from './components/Calendar';
import { format } from 'date-fns';
import LoadingSpiner from '../../../../components/ui/LoadingSpiner';

export default function CarDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams();

  const dispatch = useDispatch();
  const car = useSelector(carSelectors.selectCarById);
  const loading = useSelector(carSelectors.loading)
  const [message, setMessage] = useState('')
  useEffect(() => {
    dispatch(getCarById(id));

  }, []);


  const handleData = (payload) => {
    console.log(payload.length <= 0)
    if (payload.length <= 0) {
      setMessage('pilih tanggal sewa terlebih dahulu')
    } else {
          const formattedDate = (date) => {
            return format(date, "yyyy-MM-dd");
          };
          let requestOrder = {
            start_date_at: formattedDate(payload[0]),
            finish_date_at: formattedDate(payload[1]),
            car_id: car?.id
          };
      
          const newData = { ...requestOrder, ...car }
          localStorage.setItem('order_detail', JSON.stringify(newData))
      
          navigate('/payment')
    }

  };

  return (
    <>
      <Navbar />
      <Banner />
      <FromFilterDetail data={car} />

      {loading ? (
        <LoadingSpiner />
      ) : (
        <>{car !== undefined && <CarDetail data={car}  message= {message}>
          <Calendar onSubmit={handleData}  message= {message}/>
        </CarDetail>} </>
      )}

      <Footer />
    </>
  )
}
