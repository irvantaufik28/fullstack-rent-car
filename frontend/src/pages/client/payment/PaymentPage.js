import React, { useEffect } from "react";

import Payment from "./component/Payment";
import { DetailOrder } from "../../../components/ui/DetailOrder";
import Footer from "../../../components/layouts/Footer"
import Navbar from '../../../components/layouts/Navbar'
import HeaderPayment from "./component/HeaderPayment";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

export default function PaymentPage() {

  const token = localStorage.getItem('token')
  const user = jwtDecode(token);
  const order = useSelector((state) => state.order);

  const car = localStorage.getItem('car')

  const bankType = (payload) => {
    
      let orderData = {
        user_id : user.id,
        bankType: payload,
        start_rent_at: order.start_date_at,
        finish_rent_at: order.finish_date_at,
        car_id: order.car_id,
        totalPrice: '',
      }
       localStorage.setItem('orderdata', JSON.stringify(orderData))
  }

  return (
    <>
      <Navbar />
      <HeaderPayment />
      <DetailOrder data={JSON.parse(car)} />
      <Payment
        data={JSON.parse(car)}
        handleClick={bankType} />
      <Footer />
    </>
  );
}