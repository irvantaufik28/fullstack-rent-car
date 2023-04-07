import axios from 'axios'
import React, { useEffect } from 'react'
import { tokenValidation } from '../../utils/tokenValidation'
import Navbar from '../../components/layouts/Navbar'
import Footer from '../../components/layouts/Footer'
import UserProfile from './components/UserProfile'
import { useDispatch } from 'react-redux'

export default function UserProfilePage() {
  const dispatch = useDispatch()
    const auth = tokenValidation()


    // useEffect(() => {
    //     const getUser = async() => {
    //         const response = await axios.get('http://localhost:4001/user/profile', {
    //             headers: {
    //                 Authorization: `Bearer ${auth.tokenUser}`
    //             }
    //         })
            
            // dispatch({type: "SET_GET_USER", payload: response.data})
          
    //     }
    //     getUser()
    // }, [])


    useEffect(() => {
      getUser(auth.tokenUser)
    }, [])

    const getUser = async(token) => {
      const response = await axios.get('http://localhost:4001/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
   
      dispatch({type: "SET_GET_USER", payload: response.data})
    }



  return (
    <>
    <Navbar  />
        <UserProfile />
      <Footer />
    </>
  )
}
