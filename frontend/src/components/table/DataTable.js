import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react'
import config from '../../config'
import axios from 'axios'
import BasicTable from './BasicTable'
import { format } from 'date-fns/esm'
import { Button } from 'react-bootstrap'

const DataTable = forwardRef((props, ref) => {
    const apiUrl = config.apiBaseUrl + "/order"
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

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

    const [totalPage, setTotalPage] = useState(0)
    const [totalData, setTotalData] = useState(0)

    const filters = useRef({})

    const currentPageIndex = useRef({})
    const currentPageSize = useRef(10)
    const currentSortBy = useRef({})


    useImperativeHandle(ref, () => ({
        efreshData() {
            const defaultValues = {
                pageSize: currentPageSize.current,
                pageIndex: 0,
                sortBy: [],
            }

            fetchData({ ...defaultValues })
        },

        reloadData() {
            const values = {
                pageIndex: currentPageIndex.current,
                pageSize: currentPageSize.current,
                sortBy: currentSortBy.current,
            }
            fetchData({ ...values })
        },

        doFilter(data) {
            filters.current = data
            this.refreshData()
        },
    }))

    const fetchData = useCallback(
        async ({ pageSize, pageIndex, sortBy }) => {
            setLoading(false)
            try {
                const params = {
                    page: pageIndex + 1,
                    ...filters.current
                }

                if (sortBy && sortBy.length) {
                    const orderByMapping = {
                      'car.name': 'car',
                      'user.email': 'user_email',
                      'car.category': 'category',
                    };
                  
                    const { id, desc } = sortBy[0];
                    params.orderBy = orderByMapping[id] || id;
                    params.order = desc ? 'DESC' : 'ASC';
                  }

                if (pageSize) params.record = pageSize

                const { data } = await axios.get(apiUrl, { params })
                const list = data.orders

                setData(list)
                setTotalPage(data.pageCount)
                setTotalData(data.Count)



                currentPageIndex.current = pageIndex
                currentPageIndex.pageSize = pageSize
                currentPageIndex.sortBy = sortBy

                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        },
        [apiUrl]
    )

    return (
        <BasicTable
            columns={columns}
            data={data}
            fetchData={fetchData}
            loading={loading}
            totalPage={totalPage}
            totalData={totalData}
        />
    )
})



DataTable.defaultProps = {
    onDetail: (data) => { },
    onEdit: (data) => { },
    onDelete: (data) => { },
}

export default DataTable
