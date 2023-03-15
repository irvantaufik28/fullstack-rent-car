import React from 'react';
import img_service from '../../assets/img/img_service.png'
import "../styles/homepage.css";
import icon_check from '../../assets/icon/icon_check.svg'


export default function BestCar() {
  return (
    <>
      <div className='main position-relative'>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="image_service">
                <img className='img-fluid' src={img_service} alt="image_service" />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center ml-5">
              <div className="service-description">
                <h1>Best Car Rental for any kind of trip in (Lokasimu)!</h1>
                <p>Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan yang lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis, wedding, meeting, dll.</p>
                <ul>
                  <li><img src={icon_check} alt="icon_check" />Sewa Mobil Dengan Supir di Bali 12 Jam</li>
                  <li><img src={icon_check} alt="icon_check" />Sewa Mobil Lepas Kunci di Bali 24 Jam</li>
                  <li><img src={icon_check} alt="icon_check" />Sewa Mobil Jangka Panjang Bulanan</li>
                  <li><img src={icon_check} alt="icon_check" />Gratis Antar - Jemput Mobil di Bandara</li>
                  <li><img src={icon_check} alt="icon_check" />Layanan Airport Transfer / Drop In Out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
