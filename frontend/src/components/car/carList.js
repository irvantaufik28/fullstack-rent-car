import React from "react";

import "../styles/homepage.css";
import "../styles/findcar.css";
import { Link } from "react-router-dom";

export default function CarList(props) {
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          {props.data.cars.map((car) => (
            <div className="col-md-4">
              <div className="card-car">
                <div className="image-car">
                  <img
                    src={car.image}
                    width={250}
                    height={250}
                    alt={car.name}
                  />
                </div>
                <div className="card-body">
                  <p className="card-title">{car.name}</p>
                  <p className="card-title">Rp {car.price} / Hari</p>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor praesentium voluptas dicta, eligendi cum tempora.
                  </p>
                  <Link to={`${car.id}`}> <button className="button_banner">Mulai Sewa Mobil</button></Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

CarList.defaultProps = {
  data: {
    cars: []
  }
}
