import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import './styles/notifpayment.css';
import checklist from '../../assets/icon/icon_check.svg';

export default function NotifPayment(props) {
  const [count, setCount] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.show === true) {
      if (count > 0) {
        const timer = setTimeout(() => {
          setCount((prevCount) => prevCount - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        navigate(`/payment/ticket/${props.order_id}`);
      }
    }
  }, [count, navigate, props.order_id, props.show]);

  return (
    <>
      <Modal show={props.show}>
        <Modal.Body className="modal-notif">
          <div className="image-modal">
            <img src={checklist} style={{ height: 150 }} alt="Checklist Icon" />
          </div>
          <div className="modal-title-notif">
            <p>Bukti Pembayaran Berhasil Dikirim!</p>
          </div>
          <div className="count-time-modal">
            {count === 0 ? (
              <p>Hitungan mundur selesai!</p>
            ) : (
              <p>anda akan diarahkan ke halaman selanjutnya: {count}</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
