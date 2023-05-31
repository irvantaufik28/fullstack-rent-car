import React, { useEffect, useState } from 'react'
import navbar_logo from '../../assets/icon/navbar_logo.svg'
import { NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getUser, userSelector } from '../../features/userSlice'
import { TokenValidation } from '../../utils/tokenValidation'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie'

export default function NavBarAdmin(props) {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies ] = useCookies(['token', 'refresh_token']);
  
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

  return (
    <>
      <nav className="navbar nav-ant">
        <div className="container-fluid ant-container">
        <div className="col-md-6">
          <div className="ant-brand">
            <img src={navbar_logo} alt="brand" className="brand-cat img-fluid" />
          </div>
          </div>

          <div className="col-md-6 d-flex align-items-center ml-5">
          <div className='nav-admin-search'>
            <form className="d-flex" onSubmit={(e) => {
              e.preventDefault()
              props.onSubmit(search)
            }}>
              <input className="form-control me-2" 
              type="search" 
              placeholder="Search" 
              aria-label="Search"
              onChange={e => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

          <div className='user-profile-admin'>
          <NavDropdown 
                    title={user.user_detail?.first_name} 
                    id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/user/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/user/profile/setting">
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
          </div>
          </div>
          <div className="d-flex ant-main-head align-items-center justify-content-between">
            <button className="btn ant-collapse" type="button"><i className="fa-solid fa-bars"></i></button>
          </div>
        </div>
      </nav>

    </>

  )
}

NavBarAdmin.defaultProps = {
  onSubmit: () => '',
}