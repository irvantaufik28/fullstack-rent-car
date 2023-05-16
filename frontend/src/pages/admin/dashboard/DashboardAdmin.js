import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import DataTable from '../../../components/table/DataTable'
import { useRef } from 'react'

export default function DashboardAdmin() {
  const tableRef = useRef(null)

  return (
<>
<NavBarAdmin />
<SideBarAdmin>
  <DataTable 
   ref={tableRef}
  />
  </SideBarAdmin>
</>
  )
}
