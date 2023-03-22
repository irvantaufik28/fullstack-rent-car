import React from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Styles from "../carlist/carlist.css";
import '../carlist/carlist.css'
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
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                  <Link to="/car">
                    <div className="d-grid gap-2">
                    <Button variant="flat" className="btn-flat btn-lg">
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
