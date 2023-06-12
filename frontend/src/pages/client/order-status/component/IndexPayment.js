import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { customerGetAllOrder, customerUpdateOrder, orderSelector } from "../../../../features/orderSlice";
import AllPaymentStatus from "./payment-status/AllPaymentStatus";
import NotPaidPaymentStatus from "./payment-status/NotPaidPaymentStatus";
import SubmitPaymentStatus from "./payment-status/SubmitPaymentStatus";
import ConfirmPaymentStatus from "./payment-status/ConfirmPaymentStatus";
import CompletedPaymentStatus from "./payment-status/CompletedPaymentStatus";
import CanceledPaymentStatus from "./payment-status/CanceledPaymentStatus ";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function IndexPayment(props) {
  const dispatch = useDispatch()
  const data = useSelector(orderSelector.selectCustomerAllOrders)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(customerGetAllOrder())
  }, [])

  const handleCanceOrder = (payload) => {
    Swal.fire({
        title: 'Anda yakin ingin menkonfirmasi membatalkan pesanan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes',
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(customerUpdateOrder({ id: payload, params: { status: "CANCELED" } }))
            Swal.fire(
                'pesanan berhasil di membatalakan pesanan.',
                'success',
            ).then(() => {
                navigate('/order/status')
            })
        }
    })
}


  return (
    <>
      <div className="container">
        <div>
          <Tabs
            defaultActiveKey="payment-all"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="payment-all" title="Semua">
              <AllPaymentStatus data = {data} handleCancelOrder ={handleCanceOrder}/>
            </Tab>
            <Tab eventKey="payment-pending" title="Belum Bayar">
              <NotPaidPaymentStatus data = {data} handleCancelOrder ={handleCanceOrder}/>
            </Tab>
            <Tab eventKey="payemnt-onprocces" title="Sedang Diproses">
             <SubmitPaymentStatus data = {data} />
            </Tab>
            <Tab eventKey="payment-confirmation" title="Sudah DiKonfirmasi">
             <ConfirmPaymentStatus data = {data} />
            </Tab>
            <Tab eventKey="payment-finish" title="Selesai">
              <CompletedPaymentStatus data = {data} />
            </Tab> 
            <Tab eventKey="payment-canceled" title="DiBatalkan">
              <CanceledPaymentStatus data = {data} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
