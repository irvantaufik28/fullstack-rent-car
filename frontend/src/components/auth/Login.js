import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authimage from "../../assets/img/auth.png";
import './login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4001/auth/login", formData);
      console.log("berhasil login");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
     
        <div className="row">
          <div className="col-md-9">
            <img src={authimage} alt={"hero"} width='100%' height='100%'/>
            
          </div>
          <div className="col-md-3">
            <div className="form-login">
              <h5>Welcome, Admin BCR</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-grid gap-2 sign-button">
                      <Button variant="custome">
                        sign in
                      </Button>
                    </div>
              </Form>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default Login;
