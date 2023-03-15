import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from '../../assets/icon/logo.png'


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
    <Navbar bg="tranparent" fixed="top" className={colorChange ? 'bg-light' : 'bg-transparent'} >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo"/>
          </Navbar.Brand>
          <Nav className="ml-auto">
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
