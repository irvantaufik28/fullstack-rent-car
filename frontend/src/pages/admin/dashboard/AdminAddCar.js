import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AddCar from '../../../components/admin/car/AddCar'
import { useDispatch } from 'react-redux'
import { adminAddCar } from '../../../features/carSlice'


export default function AdminAddCar() {
  const dispatch = useDispatch()
  
  const addCar = async (payload) => {
    try {
   dispatch(adminAddCar(payload))
    } catch (err) {
      console.log(err)
    }
  }


    const onSumbitAddCar =  payload => {
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
