import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from '../../assets/icon/logo.png'
import '../styles/navbar.css'


export default function NavbarTop() {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () =>{
     if(window.scrollY >= 200){
       setColorchange(true);
     }
     else{
       setColorchange(false);
     }
  };
  window.addEventListener('scroll', changeNavbarColor);
  return (
    <>
    <Navbar bg="tranparent" fixed="top" className={colorChange ? 'bg-light pt-4 pb-4 trans-02' : 'bg-transparent trans-02'} >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="logo"/>
          </Navbar.Brand>
          <Nav className="ml-auto navlist">
            <Nav.Link href="#home">Out Service</Nav.Link>
            <Nav.Link href="#features">Why Us</Nav.Link>
            <Nav.Link href="#pricing">Testimonial</Nav.Link>
            <Nav.Link href="#pricing">FAQ</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
