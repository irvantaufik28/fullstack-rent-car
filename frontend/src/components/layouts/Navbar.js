import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { TokenValidation } from "../../utils/tokenValidation";
import { getUser, userSelector } from '../../features/userSlice'
import logo from '../../assets/icon/logo.png'
import { useNavigate } from "react-router-dom";
import './styles/navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';

export default function NavbarLayout({ linkWhyUs, linkTestimonial, linkOurService, linkFaq }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies] = useCookies(['token', 'refresh_token']);

  const auth = TokenValidation()
  const tokenUser = cookies.token
  const user = useSelector(userSelector.selectUser)

  useEffect(() => {
    if (auth.token) {
      dispatch(getUser(tokenUser))
    }
  }, [dispatch]);


  const handdleLogout = () => {
    Cookies.remove('token', { path: '/' })
    Cookies.remove('refresh_token', { path: '/' })
    navigate('/login')
  }

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

                  {auth.token ?


                    <NavDropdown
                      title={user?.user_detail?.first_name}
                      id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/user/profile">
                        Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/user/profile/setting">
                        setting
                      </NavDropdown.Item>

                      <NavDropdown.Item href="/order/status">
                        pesanan Saya
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
