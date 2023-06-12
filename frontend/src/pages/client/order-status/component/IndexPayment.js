import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { customerGetAllOrder, customerUpdateOrder, orderSelector, setPaginate } from "../../../../features/orderSlice";
import AllPaymentStatus from "./payment-status/AllPaymentStatus";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";


export default function IndexPayment() {
  const dispatch = useDispatch()
  const data = useSelector(orderSelector.selectCustomerAllOrders)
  const navigate = useNavigate();
  const paginate = useSelector((state) => state.order.paginate);
  const [selectedStatus, setSelectedStatus] = useState("")

  const [filterPage, setFilterPage] = useState({
    status: '',
    page: 1,
    take: 6,

  })

  useEffect(() => {
    setFilterPage({
      status: '',
      page: 1,
      take: 6,
    });
    if (!selectedStatus) {
      dispatch(customerGetAllOrder(filterPage));
    } else if (selectedStatus === "payment-pending") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "PENDING" } || { take: 10, page: 1, status: "PENDING" }));
    }
    else if (selectedStatus === "payment-onproccess") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "SUBMIT" } || { take: 10, page: 1, status: "SUBMIT" }));
    }
    else if (selectedStatus === "payment-confirmation") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "CONFIRM" } || { take: 10, page: 1, status: "CONFIRM" }));
    }
    else if (selectedStatus === "payment-canceled") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "CANCELED" } || { take: 10, page: 1, status: "CANCELED" }));
    }
    else if (selectedStatus === "payment-rejected") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "REJECTED" } || { take: 10, page: 1, status: "REJECTED" }));
    }
    else if (selectedStatus === "payment-finish") {
      dispatch(customerGetAllOrder({ ...filterPage, status: "COMPLETED" } || { take: 10, page: 1, status: "COMPLETED" }));
    } else if (selectedStatus === "payment-all") {
      dispatch(customerGetAllOrder(filterPage));
    }
  }, [selectedStatus, paginate]);

  const handlePageClick = async (e) => {
    const updatedFilterPage = { ...filterPage, page: e.selected + 1 };

    setFilterPage(updatedFilterPage);
    dispatch(setPaginate(updatedFilterPage));
  };

  const handleCanceOrder = (payload) => {
    Swal.fire({
        title: 'Anda yakin ingin menkonfirmasi membatalkan pesanan?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes',
    }).then((result) => {
        if (result.isConfirmed) {
            dispatch(customerUpdateOrder({ id: payload, params: { status: "CANCELED" } }))
            Swal.fire(
                'pesanan berhasil di membatalakan pesanan.',
                'success',
            ).then(() => {
                navigate('/order/status')
            })
        }
    })
}


  return (
    <>
      <div className="container">
        <div>
          <Tabs
            defaultActiveKey="payment-all"
            id="justify-tab-example"
            className="mb-3"
            justify
            onSelect={(key) => setSelectedStatus(key)}
          >
            <Tab eventKey="payment-all" title="Semua">
              <AllPaymentStatus data={data?.orders} paginate={data} handleCancelOrder ={handleCanceOrder}/>
            </Tab>
            <Tab eventKey="payment-pending" title="Belum Bayar">
              <AllPaymentStatus data={data?.orders} paginate={data} handleCancelOrder ={handleCanceOrder}/>
            </Tab>
            <Tab eventKey="payemnt-onprocces" title="Sedang Diproses">
             <AllPaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-confirmation" title="Sudah DiKonfirmasi">
             <AllPaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-finish" title="Selesai">
              <AllPaymentStatus data={data?.orders} paginate={data} />
            </Tab> 
            <Tab eventKey="payment-canceled" title="DiBatalkan">
              <AllPaymentStatus data={data?.orders} paginate={data} />
            </Tab>
          </Tabs>
        </div>

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
    </>
  );
}
