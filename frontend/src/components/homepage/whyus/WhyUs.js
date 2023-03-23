import React from 'react';
import './whyus.css'
export default function WhyUs({ whyUsStatic }) {
  return (
    <>
      <div className="container">
        <div className='title-why-us'>
          <h1>Why Us?</h1>
          <p>Mengapa harus pilih Binar Car Rental?</p>
        </div>
        <div className="row why-us">
          {whyUsStatic.map((item) => {
            return (
              <div className="col-md-3" key={item.id}>
                <div className="card-whyus">
                  <img src={item.icon} alt="icon_complete" />
                  <div className="card-body">
                    <h5 className="title-whyus">{item.title}</h5>
                    <p className="text-whyus">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}