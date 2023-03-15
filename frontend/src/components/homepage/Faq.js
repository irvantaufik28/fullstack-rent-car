import React from "react";
import "../styles/homepage.css";

function Faq() {
  return (
    <div className="main position-relative">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="left-content">
              <h1>Frequently Asked Question</h1>
              <h5>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, tempore.</h5>
            </div>
          </div>
          <div className="col-md-6">
            <div className="question">
              <select className="form-select content-option" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="question">
              <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="question">
              <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="question">
              <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="question">
              <select className="form-select" aria-label="Default select example">
                <option defaultValue>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
