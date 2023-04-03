import React, { useState} from "react";
import { Container, Navbar, Nav, Offcanvas } from "react-bootstrap";
import logo from '../../assets/icon/logo.png'
import '../styles/navbar.css'



export default function NavbarTop({linkWhyUs, linkTestimonial, linkOurService, linkFaq}) {
  const handleClick = (link) => {
    if (link.current) {
      link.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } 
  }
    

 
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);
  return (

    <>

{['lg'].map((expand) => (
        <Navbar key={expand} fixed="top" expand={expand} className={colorChange ? 'bg-light pt-4 pb-4 trans-02' : 'bg-transparent trans-02'}>
          <Container fluid>
          <Navbar.Brand href="/" className="logobrand">
              <img src={logo} alt="logo" />
              </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{ width: '50%' }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  BCR
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <Nav className="ml-auto navlist">
                  <Nav.Link
                   href="#"
                  onClick={() => handleClick(linkOurService)}
                   >Out Service</Nav.Link>
                  <Nav.Link
                   href="#"
                   onClick={() => handleClick(linkWhyUs)}
                   >Why Us</Nav.Link>
                  <Nav.Link 
                  href="#"
                  onClick={() => handleClick(linkTestimonial)}
                  >Testimonial</Nav.Link>
                  <Nav.Link 
                  href="#"
                  onClick={() => handleClick(linkFaq)}
                  >FAQ</Nav.Link>
                </Nav>
               
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
