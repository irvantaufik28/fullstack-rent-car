import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, deleteCar, getAllCars } from '../../../features/carSlice';
import AdminCarList from './components/AdminCarList';
import Swal from 'sweetalert2'
import ButtonFilter from './components/ButtonFilter';
import NavBarAdmin from '../../../components/layouts/NavBarAdmin';
import SideBarAdmin from '../../../components/layouts/SideBarAdmin';

export default function AdminCarListPage() {


  const dispatch = useDispatch();
  const data = useSelector(carSelectors.selectAllCars);

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);


  const handleDelete = (payload) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCar(payload))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success',
        )
        window.location.reload(true)
      }
    })
  }

  const filterCategory = (payload) => {
    dispatch(getAllCars({ category: payload }))
  }

  return (
    <>
      <NavBarAdmin />
      <SideBarAdmin>
        <AdminCarList cars={data.cars} handleDelete={handleDelete} >
          <ButtonFilter handleClick={filterCategory} />
        </AdminCarList >
      </SideBarAdmin>
    </>
  )
}
