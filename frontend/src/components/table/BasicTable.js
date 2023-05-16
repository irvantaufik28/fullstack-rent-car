import React, { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table'
import { COLUMNS } from './columns'
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllOrder, orderSelector } from '../../features/orderSlice';
import './styles/basictable.css'
import { GlobalFilter } from './GlobalFilter';

export const BasicTable = () => {

    const dispatch = useDispatch();
    const orders = useSelector(orderSelector.selectAllOrders);
    const dataCars = useMemo(() => orders?.orders || [], [orders]);
    console.log(orders.orders)


    const [filterPage, setFilterPage] = useState({
      take: 20,
    })

    useEffect(() => {
       dispatch(adminGetAllOrder(filterPage));
    }, []);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviosPage,
      pageOptions,
      gotoPage,
      pageCount,
      setPageSize,
      rows,
      prepareRow,
      state,
      setGlobalFilter
    } = useTable({
      columns : COLUMNS,
      data: dataCars || []
    },
    useGlobalFilter,
    useSortBy,
    usePagination
    )

    const {globalFilter} = state
    const {pageIndex, pageSize} = state
    return (
      <>
      

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroups) => (
            <tr {...headerGroups.getHeaderGroupProps()}>
              {headerGroups.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                <span>
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviosPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviosPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'<<'}</button>
      </div>
      </>
    )
}

