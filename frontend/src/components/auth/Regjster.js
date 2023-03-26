import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import config from '../../config';


export default function Register() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirm_password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        address: ''
    })



    const RegisterUser = async (e) => {
        console.log('irvan')
        e.preventDefault();
        
        try {
            
            // const apiUrl = config.apiBaseUrl
             await axios.post("http://localhost:4001/user/register", {
                form
            });
                
            console.log('berhasil login')
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className='formRegister'>
            <Form onSubmit={RegisterUser}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                name: e.target.value
                            }
                        })}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                password: e.target.value
                            }
                        }
                        )}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confrim Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confrim Password"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                confirm_password: e.target.value
                            }
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>first name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Jhon"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                first_name: e.target.value
                            }
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>last name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Doe"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                last_name: e.target.value
                            }
                        })}

                    />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasiPhone">
                    <Form.Label>phone number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="082311241"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                phone_number: e.target.value
                            }
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Jakarta"
                        onChange={e => setForm({
                            ...form,
                            ...{
                                address: e.target.value
                            }
                        })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    
                >
                    Submit
                </Button>
            </Form>
        </div>
    )
}

