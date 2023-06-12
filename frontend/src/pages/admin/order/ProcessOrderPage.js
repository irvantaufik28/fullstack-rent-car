import React, { useEffect, useState } from 'react'
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { adminGeOrderById, adminUpdateOrder, orderSelector } from '../../../features/orderSlice'
import moment from 'moment';
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import notFoundSlip from '../../../assets/img/imagenotfound.jpeg'

export default function ProcessOrderPage() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const data = useSelector(orderSelector.selectAdminOrderById)


    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    };

    useEffect(() => {
        dispatch(adminGeOrderById(id))
    }, [])

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    const handleConfirm = () => {
        Swal.fire({
            title: 'Anda yakin ingin menkonfirmasi pembayaran?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(adminUpdateOrder({ id: id, params: { status: "CONFIRM" } }))
                Swal.fire(
                    'pesanan berhasil di konfirmasi.',
                    'success',
                ).then(() => {
                    navigate(-1)
                })
            }
        })
    }

    const handleRejected = () => {
        Swal.fire({
            title: 'Anda yakin ingin Membatalkan Pesanan?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'yes',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(adminUpdateOrder({ id: id, params: { status: "REJECTED" } }))
                Swal.fire(
                    'pesanan berhasil di batalkan.',
                    'success',
                ).then(() => {
                    navigate(-1)
                })
            }
        })
    }

    return (
        <>
            <NavBarAdmin />
            <SideBarAdmin>
                <div className="container rounded bg-white mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-3 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                {/* <img className="mt-5" width="250px" src={data?.slip?.url_slip} alt='noimage' /> */}
                                <div>
                                    <img
                                        src={data?.slip?.url_slip ? data?.slip?.url_slip : notFoundSlip}
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
                                            <img src={data?.slip?.url_slip ? data?.slip?.url_slip : notFoundSlip} alt={''} style={{ maxWidth: '90%', maxHeight: '90%' }} />
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
                                    <h4 className="text-right">Konfirmasi Pembayaran</h4>
                                </div>
                                <div className="row mt-2">

                                    <div className="col-md-6"><label className="labels"><strong>Nama</strong></label> <p>{data?.user?.user_detail?.first_name} {data?.user?.user_detail?.last_name}</p></div>
                                    <div className="col-md-6"><label className="labels"><strong>No Pesanan</strong></label> <p>{data?.id} </p></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels"><strong>Car/Type</strong></label>
                                        <p>{data?.car?.name}</p>
                                    </div>

                                    <div className="col-md-12"><label className="labels"><strong>Tanggal Sewa</strong></label>
                                        <p> {moment(data?.start_rent_at).format('DD MMMM YYYY')}</p>
                                    </div>
                                    <div className="col-md-12"><label className="labels"><strong>Tanggal Berakhir</strong></label>
                                        <p> {moment(data?.finish_rent_at).format('DD MMMM YYYY')}</p>
                                    </div>
                                    <div className="col-md-12"><label className="labels"><strong>Total Bayar</strong></label>
                                        <p>{formatter.format(data?.total_price)}</p>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                </div>
                                <div className="mt-5 text-center">

                                    <Button
                                        variant='success'
                                        onClick={handleConfirm}
                                    >confirm</Button>
                                    <Button
                                        variant='danger'
                                        onClick={handleRejected}
                                    >reject</Button>


                                </div>
                            </div>
                        </div>

                    </div>
                </div>



            </SideBarAdmin>
        </>
    )
}
