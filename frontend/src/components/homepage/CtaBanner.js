import React from "react";
import "../styles/homepage.css";

export default function CtaBanner() {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="kotak">
            <div className="cta-banner">
              <div className="row">
                <div className="col-md-12 center-banner">
                  <div className="content-banner">
                    <h1>Sewa Mobil di (Lokasimu) Sekarang</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Assumenda, quas. Eaque esse consequuntur voluptatum
                      ab doloremque molestiae ad saepe quidem.
                    </p>
                    <button className="button_banner">Mulai Sewa Mobil</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
