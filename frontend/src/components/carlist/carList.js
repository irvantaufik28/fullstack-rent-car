import React from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Styles from "../carlist/carlist.css";
import { Link } from "react-router-dom";

export default function CarList(props) {
  return (
    <>
      <Container className="container-car">
        <Row>
          {props.data.cars.map(o =>
            <Col md='4' key={o.id}>
              <Card className={Styles.card} >
                <div>
                  <img
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
