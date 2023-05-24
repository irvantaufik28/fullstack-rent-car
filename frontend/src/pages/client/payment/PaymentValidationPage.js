import React, { useEffect } from 'react'
import PaymentValidation from './component/PaymentValidation'
import PaymentReminder from './component/PaymentReminder'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { customerGetOrderById, orderSelector } from '../../../features/orderSlice'

export const PaymentValidationPage = () => {

  const {id} = useParams()
  const dispatch = useDispatch()
  const order = useSelector(orderSelector.selectCustomerOrdeyById)
 


  useEffect(()=> {
    dispatch(customerGetOrderById(id))
  }, [])


  const confirmationPayment = (payload) => {
    console.log(payload)
  }

  
  return (
  <>
   <PaymentValidation data = {order} handleClick ={confirmationPayment} >
    <PaymentReminder data = {order}/>
   </PaymentValidation >
  </>
  )
}
