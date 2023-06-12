import React, { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllOrder, orderSelector, setPaginate } from "../../../../features/orderSlice";
import PaymentStatus from "./order-status/PaymentStatus";
import ReactPaginate from "react-paginate";

export default function IndexPayment(props) {




  const dispatch = useDispatch()
  const data = useSelector(orderSelector.selectAllOrders)
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
    if (selectedStatus === "payment-all") {
      dispatch(adminGetAllOrder(filterPage));
    } else if (selectedStatus === "payment-pending") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "PENDING" } || { take: 10, page: 1, status: "PENDING" }));
    }
    else if (selectedStatus === "payment-onproccess") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "SUBMIT" } || { take: 10, page: 1, status: "SUBMIT" }));
    }
    else if (selectedStatus === "payment-confirmation") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "CONFIRM" } || { take: 10, page: 1, status: "CONFIRM" }));
    }
    else if (selectedStatus === "payment-canceled") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "CANCELED" } || { take: 10, page: 1, status: "CANCELED" }));
    }
    else if (selectedStatus === "payment-rejected") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "REJECTED" } || { take: 10, page: 1, status: "REJECTED" }));
    }
    else if (selectedStatus === "payment-finish") {
      dispatch(adminGetAllOrder({ ...filterPage, status: "COMPLETED" } || { take: 10, page: 1, status: "COMPLETED" }));
    }
  }, [selectedStatus, paginate]);


  const handlePageClick = async (e) => {
    const updatedFilterPage = { ...filterPage, page: e.selected + 1 };

    setFilterPage(updatedFilterPage);
    dispatch(setPaginate(updatedFilterPage));
  };


  
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
              <PaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-pending" title="Belum Bayar">
              <PaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-onproccess" title="Perlu Diproses">
              <PaymentStatus data={data?.orders} paginate={data}/>
            </Tab>
            <Tab eventKey="payment-confirmation" title="Sudah DiKonfirmasi">
              <PaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-canceled" title="DiBatalkan">
              <PaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-rejected" title="DiTolak">
              <PaymentStatus data={data?.orders} paginate={data} />
            </Tab>
            <Tab eventKey="payment-finish" title="Selesai">
              <PaymentStatus data={data?.orders} paginate={data} />
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