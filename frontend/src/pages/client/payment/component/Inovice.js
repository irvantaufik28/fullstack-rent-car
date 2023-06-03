import React from 'react'
import logo from '../../../../assets/icon/logo.png';
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState } from 'react';


export default function Inovice(props) {

    const [loader, setLoader] = useState(false);

    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt');
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save('receipt.pdf');
        });
    };


    const finishDate = new Date(props?.finish_rent_at);
    const startDate = new Date(props?.start_rent_at);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = finishDate.getTime() - startDate.getTime();
    const dayDifference = Math.round(timeDifference / millisecondsPerDay);

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });
  return (
    <div className="container">
    <div className='description-title-ticket'>
        <h4>Pembayaran berhasil</h4>
        <p>Tunjukan Invoice ini Ke Petugas BCR di titik temu</p>
    </div>
    <div className="payment-ticket">
        <div>
            Invoice
        </div>
        <div>
            <button
                className="receipt-modal-download-button"
                onClick={downloadPDF}
                disabled={loader !== false}
            >
                {loader ? (
                    <span>Downloading</span>
                ) : (
                    <span>Download</span>
                )}
            </button>
        </div>

        <div className="wrapper">
            <div className="receipt-box">
                <div className="actual-receipt">
                    <div className="receipt-organization-logo">
                        <img alt="logo" src={logo} />
                    </div>
                    <h5>Binar Car Rental</h5>
                    <h6>
                        Jalan Suroyo No. 161 Mayangan Kota robolonggo 672000
                    </h6>
                    <div className="phone-and-website">
                        <p>
                            <a href={`mailto:binarcarrental@gmail.com`}>
                                binarcarrental@gmail.com
                            </a>
                        </p>
                        <p>081-233-334-808</p>
                    </div>

                    <div className="colored-row first">
                        <span>Customer</span>
                    </div>

                    <div className="data-row">
                        <span className="font-weight">Email</span>
                        <span>{props?.user?.email}</span>
                    </div>
                    <div className="data-row">
                        <span className="font-weight">Name</span>
                        <span>{`${props?.user?.user_detail?.first_name} ${props?.user?.user_detail?.last_name}`}</span>
                    </div>
                    <div className="data-row">
                        <span className="font-weight">Phone</span>
                        <span>{props?.user?.user_detail?.phone_number}</span>
                    </div>
                    <div className="colored-row first">
                        <span>Order Number</span>
                        <span>id</span>
                    </div>

                    <div className="data-row">
                        <span className="font-weight">number</span>
                        <span>{props?.id}</span>
                    </div>


                    <div className="colored-row">
                        <span>Transaction Details</span>
                        <span />
                    </div>

                    <div className="data-row border-bottom">
                        <span>
                            <span className="font-weight">
                                Car Type:
                            </span>
                            {' '}
                            {props?.car?.name}
                        </span>
                        <span>
                            <span className="font-weight">
                                Price:
                            </span>
                            {' '}
                            {formatter.format(props?.car?.price)}
                        </span>
                    </div>

                    <div className="data-row border-bottom">
                        <span>
                            <span className="font-weight">
                                start rent:
                            </span>
                            {' '}
                            {moment(props?.start_rent_at).format('DD MMMM YYYY')}
                        </span>
                        <span>
                            <span className="font-weight">
                                finish rent:
                            </span>
                            {' '}
                            {moment(props?.finish_rent_at).format('DD MMMM YYYY')}
                        </span>
                    </div>
                    <div className="data-row border-bottom">
                        <span>
                            <span className="font-weight">
                                total day:
                            </span>
                            {' '}
                            {dayDifference}
                        </span>

                    </div>
                    <div className="colored-row">
                        <span>total Price </span>
                        <span />
                    </div>
                    <div className="data-row border-bottom">

                        <span className="font-weight">

                            {formatter.format(props?.total_price)}
                        </span>
                        <span />
                    </div>
                    <div className="colored-row">
                        <span>Thank You For Your Order </span>
                        <span />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
