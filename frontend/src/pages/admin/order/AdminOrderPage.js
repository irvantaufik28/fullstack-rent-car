import React from 'react'
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin'
import IndexPayment from './components/IndexPayment'

export default function AdminOrderPage() {
  return (
  <>
    <NavBarAdmin />
    <SideBarAdmin>
        <IndexPayment />

    </SideBarAdmin>
    </>
  )
}
