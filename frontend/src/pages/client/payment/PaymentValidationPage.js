import React, { useEffect, useState } from 'react'
import PaymentValidation from './component/PaymentValidation'
import PaymentReminder from './component/PaymentReminder'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customerGetOrderById, customerUploadSlip, orderSelector } from '../../../features/orderSlice'
import HeaderPayment from './component/HeaderPayment'
import NavbarLayout from '../../../components/layouts/Navbar'
import FooterLayout from '../../../components/layouts/Footer'
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import NotifPayment from '../../../components/modals/NotifPayment'

export const PaymentValidationPage = () => {
  const { id } = useParams()
  const [show, setShow]  = useState(false)
  const dispatch = useDispatch()
  const order = useSelector(orderSelector.selectCustomerOrdeyById)
  const errorMessage = useSelector(orderSelector.errorMessage)
  const loading = useSelector(orderSelector.loading)
  const [cookies] = useCookies(['token', 'refresh_token']);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(customerGetOrderById(id))
  }, [])

  const token = cookies.token
  const decoded = jwtDecode(token);

  const confirmationPayment = async (payload) => {

    const formData = new FormData()
    formData.append("user_id", decoded.id)
    formData.append("order_id", id)
    formData.append("file", payload)
 
    try {
      
      const response = await dispatch(customerUploadSlip(formData)).unwrap()
     if (response.status === 201) {
      setShow(true)
     } 
    } catch (error) {
      console.log(error.message)
    }
    
   
    
  }

  return (
    <>
      <NavbarLayout />
      <HeaderPayment />
      <PaymentValidation data={order} handleClick={confirmationPayment} message={errorMessage} >
        <PaymentReminder data={order} />
      </PaymentValidation >
      <NotifPayment show = {show} order_id = {id}/>
      <FooterLayout />
    </>
  )
}
