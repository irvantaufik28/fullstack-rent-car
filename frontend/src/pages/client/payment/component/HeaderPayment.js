import { Link } from "react-router-dom";
export default function HeaderPayment() {
  return (
    <>
      <div className="main-banner position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center mt-5">
              <h5>pembayaran</h5>
            </div>
            <div className="col-md-6 d-flex align-items-center mt-5">
            <h5>pilih metode</h5>

            </div>
           
              {/* <img className="img-fluid " src={hero} alt="hero" /> */}
           
          </div>
        </div>
      </div>
    </>
  );
}
