import React, { useEffect, useState } from "react";
import { Accordion, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import '../styles/payment.css'
import { Link } from "react-router-dom";
import { AiOutlineCheck } from 'react-icons/ai';


export default function Payment(props) {

    const { children } = props

    const [loading, setLoading] = useState(true);

    const [bcaTransfer, setBCATransfer] = useState(false);
    const [bniTransfer, setBNITransfer] = useState(false);
    const [mandiriTransfer, setMandiriTransfer] = useState(false);

    const formatter = new Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    const finishDate = new Date(props.data.finish_date_at);
    const startDate = new Date(props.data.start_date_at);

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const timeDifference = finishDate.getTime() - startDate.getTime();
    const dayDifference = Math.round(timeDifference / millisecondsPerDay);
    const totalPriceRent = props.data.price * dayDifference

    const handleBCAClick = (e) => {
        e.preventDefault();
        setBCATransfer(true);
        setBNITransfer(false);
        setMandiriTransfer(false)

        props.handleClick({ BankType: "BCA", totalPrice: totalPriceRent });
    };

    const handleBNIClick = (e) => {
        e.preventDefault();
        setBNITransfer(true);
        setBCATransfer(false);
        setMandiriTransfer(false)
        props.handleClick({ BankType: "BNI", totalPrice: totalPriceRent });
    };

    const handleMandiriClick = (e) => {
        e.preventDefault();
        setMandiriTransfer(true)
        setBNITransfer(false);
        setBCATransfer(false);
        props.handleClick({ BankType: "Mandiri", totalPrice: totalPriceRent });
    };
    //  const order = localStorage.getItem('order')
    //  const data = JSON.parse(order)
    //  console.log(data)

    return (
        <div className="container payment">
      <div className="row row-payment">
        <div className="col d-flex mt-5 col-detail payment-description">
          <div className="w-100-payment">
            <div className="title-payment">
              <h5>Pilih Bank Transfer</h5>
              <p>
                Kamu bisa membayar dengan transfer melalui ATM, internet Banking
                atau Mobile Banking
              </p>
            </div>
            <div className="bank-option">
              <div>
              <Row>
                <Col>
                  <Button variant="light" className={`custom-button custom-btn-light ${bcaTransfer ? 'active' : ''}`} onClick={handleBCAClick}>
                    BCA
                  </Button>
                </Col>
                <Col>
                  <p className="ket-bank">BCA Transfer</p>
                </Col>
                <Col>
                  {bcaTransfer ? <AiOutlineCheck className="icon" color="#5CB85F" /> : null}
                </Col>
              </Row>
              <hr className="divider" />

                <Row>
                  <Col>
                  <Button variant="light" className={`custom-button custom-btn-light ${bniTransfer ? 'active' : ''}`} onClick={handleBNIClick} active={bniTransfer}>
                    BNI
                  </Button>
                  </Col>
                  <Col>
                    <p className="ket-bank">BNI Transfer</p>
                  </Col>
                  <Col>
                  {bniTransfer ? <AiOutlineCheck className="icon" color="#5CB85F" /> : null}
                </Col>
                </Row>
                <hr className="divider" />

                <Row>
                  <Col>
                    <Button variant="light" className={`custom-button custom-btn-light ${mandiriTransfer ? 'active' : ''}`} onClick={handleMandiriClick}>
                      MANDIRI
                    </Button>
                  </Col>
                  <Col>
                    <p className="ket-bank">Mandiri Transfer</p>
                  </Col>
                  <Col>
                  {mandiriTransfer ? <AiOutlineCheck className="icon" color="#5CB85F" /> : null}
                </Col>
                </Row>
                <hr className="divider" />
                
              </div>
            </div>
            
          </div>
        </div>
        <div className="col-md-5 mt-5 detail-payment">
          <Row>
            <div className="car-name-payment">
              <p>{props.data.name}</p>
            </div>
          </Row>
          <Row>
            <Accordion className="accordion-detail" defaultActiveKey="1">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Total</Accordion.Header>
                <Accordion.Body>
                  <h5>Harga</h5>
                  <ul>
                    <li>
                      <Row>
                        <Col>
                          Sewa Mobil {formatter.format(props.data.price)} x{" "}
                          {dayDifference} hari{" "}
                        </Col>
                        <Col>
                          {formatter.format(props.data.price * dayDifference)}
                        </Col>
                      </Row>
                    </li>
                  </ul>
                  <h5>Biaya Lainya</h5>
                  <ul>
                    <li>
                      <Row>
                        <Col>Pajak </Col>
                        <Col>Termasuk</Col>
                      </Row>
                    </li>
                    <li>
                      <Row>
                        <Col>Biaya Makan Sopir </Col>
                        <Col>Termasuk</Col>
                      </Row>
                    </li>
                  </ul>
                  <h5>Belum Termasuk</h5>
                  <ul>
                    <li>Bensin</li>
                    <li>Tol dan parkir</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Row>
          <Row>
            <div className="total-payment">
              <Row>
                <Col>Total</Col>
                <Col>{formatter.format(props.data.price * dayDifference)}</Col>
              </Row>

            </div>
          </Row>
          <Row>{children}</Row>
        </div>
      </div>
    </div>
    );
}

Payment.defaultProps = {
    handleClick: () => '',
}