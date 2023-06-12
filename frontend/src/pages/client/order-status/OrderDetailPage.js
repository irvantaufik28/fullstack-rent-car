import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { customerUpdateOrder, customerGetOrderById, orderSelector, } from '../../../features/orderSlice';
import { Button } from 'react-bootstrap';
import SideBarCustomer from './component/SideBarCustomer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import notFoundSlip from '../../../assets/img/imagenotfound.jpeg'
import Swal from 'sweetalert2'
import moment from 'moment';


export default function OrderDetailPage() {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);
    };
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };
    const { id } = useParams()
    const dispatch = useDispatch()

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
    const order = useSelector(orderSelector.selectCustomerOrdeyById)
    useEffect(() => {
        dispatch(customerGetOrderById(id))
    }, [dispatch, id])
    console.log(order)
    const handleDeleteOrder = () => {
        Swal.fire({
            title: 'Apakah anda ingin membatalkan Pesanan ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(customerUpdateOrder(order?.id))

                Swal.fire(
                    'dibatalkan!',
                    'Pesanan Anda Berhasil dibatalkan.',
                    'success'
                ).then(() => {
                    navigate('/order/status')
                });
            }
        });
    }
    return (
        <>
            <SideBarCustomer>
                <div className="container rounded bg-white mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                <div>
                                    <img
                                        src={order?.slip ? order?.slip?.url_slip : notFoundSlip}
                                        alt={''}
                                        onClick={toggleZoom}
                                        style={{ cursor: 'pointer', maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                    {isZoomed && (
                                        <div
                                            style={{
                                                position: 'fixed',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 9999,
                                            }}
                                            onClick={toggleZoom}
                                        >
                                            <img src={order?.slip ? order?.slip?.url_slip : notFoundSlip} alt={''} style={{ maxWidth: '90%', maxHeight: '90%' }} />
                                        </div>
                                    )}
                                </div>

                                <strong>
                                    <p>
                                        bukti transfer
                                    </p>
                                </strong>
                            </div>
                        </div>
                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Detail Pesanan</h4>
                                </div>
                                <div className="row mt-2">

                                    <div className="col-md-6"><label className="labels"><strong>email</strong></label> <p>{order?.user?.email}</p></div>
                                    <div className="col-md-6"><label className="labels"><strong>No Pesanan</strong></label> <p> {order?.id} </p></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels"><strong>Car/Type</strong></label>
                                        <p>{order?.car?.name}</p>
                                    </div
                                    ><div className="col-md-12"><label className="labels"><strong>Status Pesanan</strong></label>
                                        <p>

                                            {order.status === 'PENDING' ? "BELUM BAYAR" :
                                                order.status === 'SUBMIT' ? "SEDANG PROSES" :
                                                    order.status === 'CONFIRM' ? "SUDAH DI KONFIRMASI" :
                                                        order.status === 'CANCELED' ? "DIBATALKAN" :
                                                            order.status === "COMPLETED" ? "SELESAI" : "DITOLAK"
                                            }

                                        </p>
                                    </div>
                                    <div className="col-md-12"><label className="labels"><strong>Tanggal Mulai</strong></label>
                                        <p>
                                            {moment(order?.start_rent_at).format('DD MMMM YYYY')}
                                        </p>
                                    </div
                                    ><div className="col-md-12"><label className="labels"><strong>Tanggal Berakhir</strong></label>
                                        <p>
                                            {moment(order?.finish_rent_at).format('DD MMMM YYYY')}
                                        </p>
                                    </div>
                                    <div className="col-md-12"><label className="labels"><strong>Total Bayar</strong></label>
                                        <p>
                                            {formatter.format(order?.total_price)}
                                        </p>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                </div>
                                <div className="mt-5 text-center">
                                    {
                                        order.status === "COMPLETED" &&
                                        <>
                                            <Link to={`/car/${order.car_id}`}>
                                                <Button variant="primary">Sewa Lagi</Button>
                                            </Link>
                                            <Link to={`/payment/ticket/${order?.id}`}>
                                                <Button variant="primary">Donwload Slip</Button>
                                            </Link>
                                        </>
                                    }
                                    {
                                        order.status === "PROCESS" &&
                                        <>
                                            <Button variant='success' onClick={navigateBack}>Kembali</Button>
                                        </>

                                    }
                                    {
                                        order.status === "PENDING" &&
                                        <>

                                            <Link to={`/payment/confirm/order/${order?.id}`}>
                                                <Button variant="primary">Bayar Sekarang</Button>
                                            </Link>
                                            <Button
                                                variant="outline-danger"
                                                onClick={handleDeleteOrder}
                                            >
                                                Batalkan Pesanan
                                            </Button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </SideBarCustomer>
        </>
    )
}
