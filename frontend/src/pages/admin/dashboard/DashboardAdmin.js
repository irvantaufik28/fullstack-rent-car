import SideBarAdmin from '../../../components/layouts/SideBarAdmin' 
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import { BasicTable } from '../../../components/table/BasicTable'

export default function DashboardAdmin() {
  
  return (
<>
<NavBarAdmin />
<SideBarAdmin>
  <BasicTable />
  </SideBarAdmin>
</>
  )
}
