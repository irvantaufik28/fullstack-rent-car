import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { carSelectors, deleteCar, getAllCars } from '../../../features/carSlice';
import AdminCarList from './components/AdminCarList';
import Swal from 'sweetalert2'
import ButtonFilter from './components/ButtonFilter';
import NavBarAdmin from '../../../components/layouts/NavBarAdmin';
import SideBarAdmin from '../../../components/layouts/SideBarAdmin';
import ReactPaginate from "react-paginate";


export default function AdminCarListPage() {
  const [filterPage, setFilterPage] = useState({
    name: '',
    category: '',
    page: 1,
    take: 6,
  
  })
  const dispatch = useDispatch();
  const data = useSelector(carSelectors.selectAllCars);
 

  useEffect(() => {
    dispatch(getAllCars(filterPage));
  }, [dispatch, filterPage]);


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
    setFilterPage({ ...filterPage, category: payload, page: 1 });
  }

  const handlePageClick = async (e) => {
    setFilterPage({...filterPage,...{page: e.selected + 1}})
  };

  const navbarSubmit = (payload) => {
    setFilterPage({...filterPage,...{name: payload}})
  }

  return (
    <>
      <NavBarAdmin onSubmit = {navbarSubmit}/>
      <SideBarAdmin>
        <div className='container-car container'>
        <AdminCarList cars={data.cars} handleDelete={handleDelete} >
          <ButtonFilter handleClick={filterCategory} />
        </AdminCarList >

        <div className="container-pagination container">
            <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={data?.pageCount || 0}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
        </div>

      </SideBarAdmin>
    </>
  )
}
