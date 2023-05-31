import React, { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { customerGetAllOrder, orderSelector } from "../../../../features/orderSlice";
import AllPaymentStatus from "./payment-status/AllPaymentStatus";
import NotPaidPaymentStatus from "./payment-status/NotPaidPaymentStatus";
import SubmitPaymentStatus from "./payment-status/SubmitPaymentStatus";
import ConfirmPaymentStatus from "./payment-status/ConfirmPaymentStatus";
import CompletedPaymentStatus from "./payment-status/CompletedPaymentStatus";
import CanceledPaymentStatus from "./payment-status/CanceledPaymentStatus ";

export default function IndexPayment(props) {
  const dispatch = useDispatch()
  const data = useSelector(orderSelector.selectCustomerAllOrders)

  useEffect(() => {
    dispatch(customerGetAllOrder())
  }, [])


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
              <AllPaymentStatus data = {data}/>
            </Tab>
            <Tab eventKey="payment-pending" title="Belum Bayar">
              <NotPaidPaymentStatus data = {data}/>
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
