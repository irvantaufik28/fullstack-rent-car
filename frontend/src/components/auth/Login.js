import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ImageWithLoading from '../helper/ImageWithLoading';
import hero from '../../assets/img/hero.png'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',

      });
    
      const navigate = useNavigate()
    
      const { email, password } = formData;
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post('http://localhost:4001/auth/login', formData);
          console.log('berhasil login');
          navigate('/dashboard')
        } catch (err) {
          console.log(err);
        }
      };

    return (
      <>
      <div className="container fluid">
      <div className="row">

          <div className="col-md-3">

        <div className='formLogin'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' name='email' value={email} onChange={handleChange} />
          <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' value={password} onChange={handleChange} />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
          </div>
    </div>
    <div className="col-md-9">
      <ImageWithLoading src={hero} alt={'hero'} />
    </div>
      </div>
      </div>
    </>
    )
}

export default Login