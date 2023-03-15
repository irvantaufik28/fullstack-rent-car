import React from 'react';
import "../styles/homepage.css";
import icon_24hrs from '../../assets/icon/icon_24hrs.svg'
import icon_complete from '../../assets/icon/icon_complete.svg'
import icon_price from '../../assets/icon/icon_price.svg'
import icon_professional from '../../assets/icon/icon_professional.svg'

export default function WhyUs() {
    return (
        <>
            <div className="container">
                <div className='title-why-us'>
                    <h1>Why Us?</h1>
                    <p>Mengapa harus pilih Binar Car Rental?</p>
                </div>
                <div className="row why-us">
                    <div className="col-md-3">
                        <div className="card">
                            <img src={icon_complete} alt="icon_complete" />
                            <div className="card-body">
                                <h5 className="card-title">Mobil Lengkap</h5>
                                <p className="card-text">Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={icon_price} alt="icon_price" />
                            <div className="card-body">
                                <h5 className="card-title">Harga Murah</h5>
                                <p className="card-text">Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={icon_24hrs} alt="icon_24hrs" />
                            <div className="card-body">
                                <h5 className="card-title">Layanan 24 jam</h5>
                                <p className="card-text">Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={icon_professional} alt="icon_professional" />
                            <div className="card-body">
                                <h5 className="card-title">Sopir Profesional</h5>
                                <p className="card-text">Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
