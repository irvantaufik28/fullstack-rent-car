import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
  });

  const navigate = useNavigate()

  const { email, password, confirm_password, first_name, last_name, phone_number, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:4001/user/register', formData);
      console.log('berhasil login');
      navigate('/login')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='formRegister'>
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

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Confirm Password' name='confirm_password' value={confirm_password} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formFirstName'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' placeholder='Jhon' name='first_name' value={first_name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formLastName'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' placeholder='Doe' name='last_name' value={last_name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasiPhone'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type='text' placeholder='082311241' name='phone_number' value={phone_number} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' placeholder='Jakarta' name='address' value={address} onChange={handleChange} />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  );
}
