import React, { useEffect, useState } from 'react'
import PaymentValidation from './component/PaymentValidation'
import PaymentReminder from './component/PaymentReminder'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customerGetOrderById, orderSelector } from '../../../features/orderSlice'
import HeaderPayment from './component/HeaderPayment'
import NavbarLayout from '../../../components/layouts/Navbar'
import FooterLayout from '../../../components/layouts/Footer'
import axios from 'axios'
import config from '../../../config'
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

export const PaymentValidationPage = () => {
  const [message, setMessage] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const order = useSelector(orderSelector.selectCustomerOrdeyById)

  const [cookies] = useCookies(['token', 'refresh_token']);


  useEffect(() => {
    dispatch(customerGetOrderById(id))
  }, [])

  const token = cookies.token
  const decoded = jwtDecode(token);

  const confirmationPayment = async  (payload) => {
  
    const apiUrl = config.apiBaseUrl
    try {
      const formData = new FormData()
      formData.append("user_id", decoded.id)
      formData.append("order_id", id )
      formData.append("file", payload )
  
      await axios.post(apiUrl + "/slip/post", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
      }
      })
      
    } catch (err) {
      setMessage((err.response.data.message))

    }
  }


  return (
    <>
      <NavbarLayout />
      <HeaderPayment />
      <PaymentValidation data={order} handleClick={confirmationPayment} message={message} >
        <PaymentReminder data={order} />
      </PaymentValidation >
      <FooterLayout />
    </>
  )
}
