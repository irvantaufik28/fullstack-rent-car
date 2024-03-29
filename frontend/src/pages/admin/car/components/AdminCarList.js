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

  const { children } = props

  const formatter = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });



  return (
    <>
    
        <div className="top-content">
          <Row>
            <p><strong>Cars</strong> &gt; List Cars</p>
            <div className="col-md-6">List Cars</div>

            <div className="col-md-6 button_addcar_bar">
              <Link to="/admin/addcar">
                <button className="button_addcar">add Car</button> </Link>
            </div>
            {/* component button filter by category */}
            <div>
              {children}

            </div>
          </Row>
        </div>
        <Row>
          {props.cars?.map(o =>


            <Col md='4' key={o.id}>
              <Card className={Styles.card} >
                {o.car_media?.length <= 0 || o.image === undefined ?
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
                        src={o.car_media.find(media => media.is_main_image)?.image_url}
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
                  <p>status {o.status ? 'rental' : 'free'}</p>

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

                    <Link to={`/admin/update/car/${o.id}`}>

                      <Button variant="success">
                        edit
                      </Button>

                    </Link>

                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
     

    
    </>
  );
}
