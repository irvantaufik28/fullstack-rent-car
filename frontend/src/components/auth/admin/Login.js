import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import authimage from "../../../assets/img/auth.png";
import "./login.css";

export default function Login  (props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <div className="row">
        <div className="col-md-9">
          <img src={authimage} alt={"hero"} width="100%" height="100%" />
        </div>
        <div className="col-md-3">
          <div className="form-login">
            <h5>Welcome, Admin BCR</h5>
             {props.message && (
              <div className="alert alert-danger" role="alert">
                {props.message}
              </div>
            )}

            {props.role === "CUSTOMER" && (
              <div className="alert alert-danger" role="alert">
                you don't have admin access
              </div>
            )} 

            <Form onSubmit={(e) => {
              e.preventDefault()
              props.onSubmit(formData)
            }}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={e => setFormData({
                    ...formData,...{email: e.target.value}
                  })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={e => setFormData({
                    ...formData,...{password: e.target.value}
                  })}
                />
              </Form.Group>

              <div className="d-grid gap-2 sign-button">
                <Button type="sumbit" variant="custome">
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

Login.defaultProps = {
  onSubmit: () => {}
}