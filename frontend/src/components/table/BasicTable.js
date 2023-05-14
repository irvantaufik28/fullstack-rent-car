import React, { useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './columns'
import { useDispatch, useSelector } from 'react-redux';
import { adminGetAllOrder, orderSelector } from '../../features/orderSlice';
import './styles/basictable.css'

export const BasicTable = () => {

    const dispatch = useDispatch();
    const orders = useSelector(orderSelector.selectAllOrders);
    const dataCars = useMemo(() => orders?.orders || [], [orders]);

    useEffect(() => {
       dispatch(adminGetAllOrder());
    }, [dispatch]);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable({
      columns : COLUMNS,
      data: dataCars || []
    },
    useSortBy)

    return (
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
          {rows.map(row => {
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
    )
}

