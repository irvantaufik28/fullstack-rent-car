import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AddCar from '../../../components/admin/car/AddCar'
// import config from '../../../config'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function AdminAddCar() {
  const navigate = useNavigate()
  const addCar = async (params = {}) => {
    try {
      await axios.post('http://localhost:4001/car', params, {
        headers: {"content-type": "multipart/form-data"}
      });
      navigate('/dashboard')
    } catch (err) {
      console.log(err);
    }
  };


    const onSumbitAddCar = payload => {
      addCar(payload)
    }
  return (
    <>

    <SideBarAdmin>
        <NavBarAdmin>
         <AddCar  onSubmit={onSumbitAddCar}/>
        </NavBarAdmin>
    </SideBarAdmin>

</>
  )
}
