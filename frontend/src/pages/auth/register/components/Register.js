import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import authimage from '../../../../assets/img/auth.png'
import LoadingSpiner from '../../../../components/ui/LoadingSpiner'
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
  });


  if (props.successRegister === true) {
    setTimeout(() => {
      setLoading(false);
    }, 2000);


    return (
      <div>
        {loading ? (

          <div>
            <div className="main">
              <div className="container">
                <div className="kotak">
                  <div className="cta-banner">
                    <div className="row">
                      <div className="col-md-12 success-banner">
                        <div className="content-banner">
                          <h1>Success</h1>
                          <p>
                            congralutation, your account has been successfully created
                          </p>
                          <LoadingSpiner />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        ) : (navigate('/login'))}
      </div>
    )
  } else {
    return (
      <>
        <div className="row">
          <div className="col-md-9">
            <img src={authimage} alt={"hero"} width="100%" height="100%" />
          </div>
          <div className="col-md-3">
            <div className="form-login">
              <h5>REGISTRATION</h5>
              {props.message && (
                <div className="alert alert-danger" role="alert">
                  {props.message}
                </div>
              )}


              <Form onSubmit={(e) => {
                e.preventDefault()
                props.onSubmit(formData)
              }}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>first name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="first name"
                    name="first_name"
                    onChange={e => setFormData({
                      ...formData, ...{ first_name: e.target.value }
                    })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="last name"
                    name="last_name"
                    onChange={e => setFormData({
                      ...formData, ...{ last_name: e.target.value }
                    })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={e => setFormData({
                      ...formData, ...{ email: e.target.value }
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
                      ...formData, ...{ password: e.target.value }
                    })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Confrim Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    onChange={e => setFormData({
                      ...formData, ...{ confirm_password: e.target.value }
                    })}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0823115511"
                    name="phone_number"
                    onChange={e => setFormData({
                      ...formData, ...{ phone_number: e.target.value }
                    })}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    onChange={e => setFormData({
                      ...formData, ...{ address: e.target.value }
                    })}
                  />
                </Form.Group>

                <div className="d-grid gap-2 sign-button">
                  <Button type="sumbit" variant="custome">
                    Register
                  </Button>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </>
    );

  }


}

Register.defaultProps = {
  onSubmit: () => { }
}