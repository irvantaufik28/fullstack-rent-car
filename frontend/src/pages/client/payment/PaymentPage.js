import React, { useEffect, useState } from "react";
import Payment from "./component/Payment";
import { DetailOrder } from "../../../components/ui/DetailOrder";
import Footer from "../../../components/layouts/Footer"
import Navbar from '../../../components/layouts/Navbar'
import HeaderPayment from "./component/HeaderPayment";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { customerAddOrder } from "../../../features/orderSlice";
import axios from "axios";

export default function PaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [disabledButton, setDisableButton] = useState(true)
  const token = localStorage.getItem('token')
  const user = jwtDecode(token);

  const car = localStorage.getItem('car')
  const dayRent = localStorage.getItem('dayRent')
  const dayRentJson = JSON.parse(dayRent)
  const bankType = (payload) => {
    let orderData = {
      user_id: user.id,
      bankType: payload.BankType,
      start_rent_at: dayRentJson.start_date_at,
      finish_rent_at: dayRentJson.finish_date_at,
      car_id: dayRentJson.car_id,
      totalPrice: payload.totalPrice,
    }
    setDisableButton(payload.BankType ? false : true)

    localStorage.setItem('orderdata', JSON.stringify(orderData))
  }

  const addOrder = async (params) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:4001/order", params, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      navigate(`/payment/validation/order/${response.data?.id}`)
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const clickButton = () => {
    const formData = localStorage.getItem('orderdata');
    const formDataJson = JSON.parse(formData);

    const payload = {
      start_rent_at: formDataJson.start_rent_at,
      finish_rent_at: formDataJson.finish_rent_at,
      car_id: formDataJson.car_id
    }

    addOrder(payload)

  }


  return (
    <>
      <Navbar />
      <HeaderPayment />
      <DetailOrder data={JSON.parse(car)} />
      <Payment
        data={JSON.parse(car)}
        handleClick={bankType} >
        <div className="d-grid gap-2">
          <Button
            variant="flat"
            onClick={clickButton}
            disabled={disabledButton}
          >
            Bayar
          </Button>
        </div>
      </Payment>
      <Footer />
    </>
  );
}