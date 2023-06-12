import SideBarAdmin from '../../../components/layouts/SideBarAdmin'
import NavBarAdmin from '../../../components/layouts/NavBarAdmin'
import DataTable from '../../../components/table/DataTable'
import { Row } from 'react-bootstrap'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "2023-05-14",
    orderCount: 23
  },
  {
    date: "2023-05-15",
    orderCount: 21
  },
  {
    date: "2023-05-16",
    orderCount: 18
  },
  {
    date: "2023-05-17",
    orderCount: 21
  },
  {
    date: "2023-05-18",
    orderCount: 81
  },
  {
    date: "2023-05-19",
    orderCount: 31
  },
  {
    date: "2023-05-20",
    orderCount: 1
  },
  {
    date: "2023-05-21",
    orderCount: 21
  }
]

export default function DashboardAdmin() {
  return (
    <>
    
      <SideBarAdmin>
        <Row>
          <ResponsiveContainer width="80%" height={400}>
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />

              {Object.keys(data[0]).map((key, index) => {
                if (key !== 'date') {
                  return <Bar key={index} dataKey={key} fill={'#586B90'} />
                }
                return null;
              })}
            </BarChart>
          </ResponsiveContainer>
          <DataTable />
        </Row>
      </SideBarAdmin>
    </>
  );
}