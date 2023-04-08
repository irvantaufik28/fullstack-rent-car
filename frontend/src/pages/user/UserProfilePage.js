import React, { useEffect } from 'react'
import { tokenValidation } from '../../utils/tokenValidation'
import Navbar from '../../components/layouts/Navbar'
import Footer from '../../components/layouts/Footer'
import UserProfile from './components/UserProfile'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector, getUser } from '../../features/userSlice'



export default function UserProfilePage() {

  const navigate = useNavigate()
  const auth = tokenValidation()

  const dispatch = useDispatch()
  const userData = useSelector(userSelector.selectUser)


  useEffect(() => {
    if (!auth.token) {
      (navigate('/login'))
    }
    dispatch(getUser(auth.tokenUser))
  }, [dispatch])

  return (
    <>
      <Navbar />
      <UserProfile data={userData} />
      <Footer />
    </>
  )
}
