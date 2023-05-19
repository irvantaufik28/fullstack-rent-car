import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";


export default function PaymentPage(props) {
  const [loading, setLoading] = useState(true);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });
//  const order = localStorage.getItem('order')
//  const data = JSON.parse(order)
//  console.log(data)
const order = useSelector((state) => state.order);
console.log(order)
  return (
    <div className="container detailcar">
      <div className="row row-car-detail">
        <div className="col d-flex mt-5 col-detail car-description">
          <div className="w-100">
            <h5>Tentang Paket</h5>
            <h6>Inculde</h6>
            <ul>
              <li>
                Apa saja yang termasuk dalam paket misal durasi max 12 jam
              </li>
              <li>Sudah termasuk bensin selama 12 jam</li>
              <li>Sudah termasuk Tiket Wisata</li>
              <li>Sudah termasuk pajak</li>
            </ul>
            <h6>Inculde</h6>
            <ul>
              <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
              <li>
                Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
                20.000/jam
              </li>
              <li>Tidak termasuk akomodasi penginapan</li>
            </ul>


            <Accordion className="accordion-detail" defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header >
                  Refund, Reschedule, Overtime
                </Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya
                      Rp 20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya
                      Rp 20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                    <li>Tidak termasuk biaya makan sopir Rp 75.000/hari</li>
                    <li>
                      Jika overtime lebih dari 12 jam akan ada tambahan biaya
                      Rp 20.000/jam
                    </li>
                    <li>Tidak termasuk akomodasi penginapan</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </div>
        </div>
        <div className="col-md-5 d-flex mt-5 detail-car-card">
          <div className="card-car">
            <div className="image-car-detail">
             <h1>hallo</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}