import React, { useState } from "react";
import Payment from "./component/Payment";
import Footer from "../../../components/layouts/Footer"
import Navbar from '../../../components/layouts/Navbar'
import HeaderPayment from "./component/HeaderPayment";
import OrderDetail from "./component/OrderDetail";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function PaymentPage() {
  const navigate = useNavigate()
  const [disabledButton, setDisableButton] = useState(true)
  const token = localStorage.getItem('token')
  const user = jwtDecode(token);

  const order_detail = localStorage.getItem('order_detail')

  const orderDetailJson = JSON.parse(order_detail)
  const bankType = (payload) => {
    let orderData = {
      user_id: user.id,
      bankType: payload.BankType,
      start_rent_at: orderDetailJson.start_date_at,
      finish_rent_at: orderDetailJson.finish_date_at,
      car_id: orderDetailJson.car_id,
      totalPrice: payload.totalPrice,
    }
    setDisableButton(payload.BankType ? false : true)
    
    localStorage.setItem('order_data', JSON.stringify(orderData))
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
    const formData = localStorage.getItem('order_data');
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
      <OrderDetail data={orderDetailJson} />
      <Payment
        data={orderDetailJson}
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