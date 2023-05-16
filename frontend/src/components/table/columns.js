import { format } from 'date-fns'
import { useMemo } from 'react'
import { Button } from 'react-bootstrap'

export const COLUMNS = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'User Email',
        accessor: 'user.email',
      },
      {
        Header: 'Car',
        accessor: 'car.name',
      },
      {
        Header: 'Start Rent',
        accessor: 'start_rent_at',
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy')
        },
      },
      {
        Header: 'Finish Rent',
        accessor: 'finish_rent_at',
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy')
        },
      },
      {
        Header: 'Price',
        accessor: 'total_price',
      },
      {
        Header: 'Category',
        accessor: 'car.category',
      },
      {
        Header: 'Order Date',
        accessor: 'createdAt',
        Cell: ({ value }) => {
          return format(new Date(value), 'dd/MM/yyyy')
        },
      },
      {
        Header: 'Action',
        accessor: 'birthDate',
        Cell: ({ row }) => (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="me-2"
              onClick={() => props.onDetail(row.original)}
            >
              Detail
            </Button>
            <Button
              variant="info"
              size="sm"
              className="me-2"
              onClick={() => props.onEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => props.onDelete(row.original)}
            >
              Delete
            </Button>
          </>
        ),
      },
    ],
    [props]
  )

  return columns
}
