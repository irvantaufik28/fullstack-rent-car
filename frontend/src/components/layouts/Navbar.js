import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { tokenValidation } from "../../utils/tokenValidation";
import { getUser } from "../../utils/getuser";
import logo from '../../assets/icon/logo.png'
import '../styles/navbar.css'
import { useNavigate } from "react-router-dom";



export default function NavbarTop({ linkWhyUs, linkTestimonial, linkOurService, linkFaq }) {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  const handleClick = (link) => {
    if (link.current) {
      link.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  
  const handdleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }

  const auth = tokenValidation()
  useEffect(() => {
  if (auth.token) {
  getUser(auth.tokenUser).then(data => setUser(data)) 
}
}, []);


     
  


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

                  {auth.token ?


                    <NavDropdown title={user.email} id="collasible-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        setting
                      </NavDropdown.Item>
                     
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                       href="#action/3.4"
                       onClick={() => handdleLogout()}
                       >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                    :

                    <Nav.Link
                      href="/login"
                    >Login</Nav.Link>
                  }
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
