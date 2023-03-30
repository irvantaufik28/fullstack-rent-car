import React, { useEffect, useState, CSSProperties } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Styles from "../carlist/carlist.css";
import { Link } from "react-router-dom";
import ImageWithLoading from "../helper/ImageWithLoading";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function CarList(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
       
        <div className="loader-container">
      	  <div className="spinner"></div>
        </div>
       
      </>
    );
  }

  if (!props.data.cars.length) {
    return (
      <>
        <Container className="container-car">
          <div className="carnotfound">
            <h1>car not found!!!</h1>
          </div>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container className="container-car">
        <Row>
          {props.data.cars.map(o =>
            <Col md='4' key={o.id}>
              <Card className={Styles.card} >
                <div>
                  <ImageWithLoading
                    src={o.image}
                    alt={o.name}
                  />
                </div>
                <Card.Body>
                  <p>{o.name}</p>
                  <h6>Rp {o.price} / hari</h6>
                  <Card.Text>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est natus repellendus inventore, similique necessitatibus cumque architecto a nesciunt vitae! Minus.
                  </Card.Text>
                  <Link to={`${o.id}`}>
                    <div className="d-grid gap-2">
                      <Button variant="flat">
                        Pilih Mobil
                      </Button>
                    </div>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

CarList.defaultProps = {
  data: {
    cars: []
  }
}
