import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ImageWithLoading from "../../../../components/ui/ImageWithLoading";
import LoadingSpiner from "../../../../components/ui/LoadingSpiner";
import nullImage from '../../../../assets/img/imagenotfound.jpeg'
import { BsFillPeopleFill } from 'react-icons/bs'
import { BiTime } from 'react-icons/bi'
import Styles from "./admincarlist.css";


export default function AdminCarList(props) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <LoadingSpiner />
    );
  }

  if (!props.cars.length) {
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

  const formatter = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });



  return (
    <>
      <Container className="container-car">
        <div className="top-content">
          <Row>

            <div className="col-md-6"><strong>List Cars</strong></div>
            <div className="col-md-6 button_addcar_bar">
              <Link to="/admin/addcar">
                <button className="button_addcar">add Car</button> </Link>
            </div>
          </Row>
        </div>
        <Row>
          {props.cars.map(o =>  
          

            <Col md='4' key={o.id}>
              <Card className={Styles.card} >
                {o.image === null ?
                  (
                    <div>
                      <ImageWithLoading
                        src={nullImage}
                        alt={'nll'}
                      />
                    </div>
                  ) :
                  (
                    <div>
                      <ImageWithLoading
                        src={o.image}
                        alt={o.name}
                      />
                    </div>
                  )
                }
                <Card.Body>
                  <p>{o.name}</p>
                  <h6>{formatter.format(o.price)} / hari</h6>
                  <p className="card-title-detail">
                    <BsFillPeopleFill />

                    {o.category === "small"
                      ? "2-4 orang"
                      : o.category === "medium"
                        ? "4-6 orang"
                        : o.category === "large"
                          ? "6-8 orang"
                          : o.category}
                  </p>
                  <BiTime /> update at {o.updateAt}
                  <p>status {o.status? 'rental' : 'free'}</p>
                  
                  <Card.Body>

                    <Button
                      variant="outline-danger"
                      disabled={o.status}
                      onClick={(e) => {
                        e.preventDefault()
                        props.handleDelete(o.id)
                      }}
                    >
                      Delete
                    </Button>
                    <Card.Link href="#">
                      <Button variant="success">
                        edit
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
