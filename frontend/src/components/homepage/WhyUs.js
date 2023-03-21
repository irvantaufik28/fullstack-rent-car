import React from 'react';

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
                <div className="card">
                  <img src={item.icon} alt="icon_complete" />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.desc}</p>
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
