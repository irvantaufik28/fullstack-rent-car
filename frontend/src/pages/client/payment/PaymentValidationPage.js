import React, { useEffect } from 'react'
import { PaymentValidation } from './component/PaymentValidation'
import Timer from './component/Timer'
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

  
  return (
  <>
   <PaymentValidation data = {order} >
    <Timer data = {order}/>
   </PaymentValidation >
  </>
  )
}
