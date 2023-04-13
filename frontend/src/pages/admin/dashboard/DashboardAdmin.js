import React from 'react'
import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import AdminCarListPage from '../car/AdminCarListPage'

export default function DashboardAdmin() {
  return (
<>

    <SideBarAdmin>
        <NavBarAdmin>
          <AdminCarListPage />
        </NavBarAdmin>
    </SideBarAdmin>

</>
  )
}
