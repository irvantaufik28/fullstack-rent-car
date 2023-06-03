import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { customerGetOrderById, orderSelector } from '../../../features/orderSlice';
import Navbar from '../../../components/layouts/Navbar';
import HeaderPayment from './component/HeaderPayment';

import 'moment/locale/id';
import './styles/paymentreceipt.css';
import "./styles/paymentticket.css";
import Inovice from './component/Inovice';
import PendingInvoice from './component/PendingInvoice';
import FooterLayout from '../../../components/layouts/Footer';

export default function PaymentReceiptPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector(orderSelector.selectCustomerOrdeyById);
    const navigate = useNavigate();
    const navigateBack = () => {
        navigate(-1);
    };
    useEffect(() => {
        dispatch(customerGetOrderById(id));
    }, []);



    return (
        <>
            <Navbar />
            <HeaderPayment navigateBack={navigateBack} padingBottom={true} />
            {order?.status === "SUBMIT" ?
                <PendingInvoice />
             :
               <Inovice {...order} />
            }
            <FooterLayout />
        </>
    );
}
