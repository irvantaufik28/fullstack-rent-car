import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function NotifPayment(props) {

  const [count, setCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      
      navigate(`/payment/ticket/${props.order_id}`);
    }
  }, [count]);
  return (
    <>
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
    
      <div>
      {count === 0 ? (
        <p>Hitungan mundur selesai!</p>
      ) : (
        <p>Hitungan mundur: {count}</p>
      )}
    </div>

      </Modal.Body>
      <Modal.Footer>
       
      </Modal.Footer>
    </Modal>
  </>
  )
}
