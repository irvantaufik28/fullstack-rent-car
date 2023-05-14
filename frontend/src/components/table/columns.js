import { format } from 'date-fns'

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'User Email',
        accessor: 'user.email'
    },
    {
        Header: 'Car',
        accessor: 'car.name'
    },
    {
        Header: 'Start Rent',
        accessor: 'start_rent_at',
        Cell: ({value}) => {return format(new Date (value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Finish Rent',
        accessor: 'finish_rent_at',
        Cell: ({value}) => {return format(new Date (value), 'dd/MM/yyyy')}
    },
    {
        Header: 'Price',
        accessor: 'total_price'
    },
    {
        Header: 'Category',
        accessor: 'car.category'
    },
    {
        Header: 'Order Date',
        accessor: 'createdAt',
        Cell: ({value}) => {return format(new Date (value), 'dd/MM/yyyy')}
    }
]