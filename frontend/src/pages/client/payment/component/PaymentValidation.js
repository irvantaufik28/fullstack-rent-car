import React, { useRef } from 'react'
import '../styles/paymentvalidation.css'
import { Button, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const PaymentValidation = (props) => {

    const order = localStorage.getItem('orderdata')
    console.log(JSON.parse(order))

    const inputRef = useRef(null);

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    console.log('Text copied to clipboard');
                })
                .catch((error) => {
                    console.error('Failed to copy text:', error);
                });
        }
    };
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="image_service">
                        <div className='left-content-paymnet'>
                            <div className='payment-section reminder-payment'>
                                <div className='row'>

                                    <div className='col-md-6'>
                                        <div className='reminder-title'>
                                            <h5>Selesaikan pembayaran</h5>
                                            <h5>tanggal JTO</h5>
                                        </div>
                                    </div>
                                    {/* TIMMER SECTION */}
                                    <div className='col-md-6'>
                                    {props.children}
                                    </div>
                                </div>
                            </div>
                            <div className='payment-section'>
                                <h5>lakukan transfer ke</h5>
                                <div className='payment-section-bank'>
                                    <Row>
                                        <Col>
                                            <Button
                                                variant="light"
                                            >BCA</Button>{' '}
                                        </Col>
                                        <Col>
                                            <p>BCA Transfer</p>
                                            <p>a.n Binar Car Rental</p>
                                        </Col>
                                    </Row>
                                </div>
                                <div className='coloumn-copy-rek'>
                                    <h5>no rekening</h5>
                                    <input ref={inputRef} type="text" />
                                    <button onClick={handleCopy}>
                                        <p>copy</p>
                                    </button>

                                </div>
                                <div className='coloumn-copy-totalpay'>
                                    <h5>total bayar</h5>
                                    <input ref={inputRef} type="text" />
                                    <button onClick={handleCopy}>
                                        <p>copy</p>
                                    </button>

                                </div>
                            </div>
                            <div className='payment-section'>
                                <div className='payment-info'>
                                    <h5>intruksi pemabayaran</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='right-content-payment'>
                        <p>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</p>

                        <Link to={'/payment/confrimation'}>
                            <div className="d-grid gap-2">
                                <Button variant="flat">
                                    konfirmasi pembayaran
                                </Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}
