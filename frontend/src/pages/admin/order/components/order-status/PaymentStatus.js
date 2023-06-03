import { Button, Card } from 'react-bootstrap'
import ImageWithLoading from '../../../../../components/ui/ImageWithLoading'
import moment from 'moment';
import nullImage from '../../../../../assets/img/imagenotfound.jpeg'
import '../../styles/cardpayment.css'
import 'moment/locale/id';
import { Link } from 'react-router-dom';

moment.locale('id')



export default function PaymentStatus(props) {
  
  const formatter = new Intl.NumberFormat("id-ID", {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  });


  return (
    <>
      {props.data?.map(o => (
        <Card className='card-status-payment' key={o.id}>
          <Card.Header>
            {o.status === 'PENDING' ? "BELUM BAYAR" :
            o.status === 'SUBMIT' ? "PERLU DI PROSES" : 
            o.status === 'CONFIRM' ? "SUDAH DI KONFIRMASI":
            o.status === 'CANCELED' ? "DIBATALKAN" : 
            o.status === "COMPLETED" ? "SELESAI" : "DITOLAK"
            }
          
          </Card.Header><Card.Body>
            <div className='row'>
              <div className='col-md-9 card-content-payment'>
                {o?.car?.car_media?.length <= 0 ?
                (
                  <div>
                    <ImageWithLoading
                      src={nullImage}
                      alt={'null'}
                    />
                  </div>
                ) :
                (
                  <div>
                    <ImageWithLoading
                     src={o?.car?.car_media?.find(media => media.is_main_image)?.image_url}
                     alt={o.name}
                    />
                  </div>
                )
              }
                <div>
                  <h5>Nama/Type Mobil {o?.car?.name} </h5>
                  <h5>tanggal Sewa {moment(o?.start_rent_at).format('DD MMMM YYYY')}</h5>
                  <h5>tanggal berakhir sewa {moment(o?.finish_rent_at).format('DD MMMM YYYY')}</h5>
                  <p>No pesanan: {o.id}</p>
                </div>
              </div>
              <div className='col-md-3'>
                total bayar: {formatter.format(o?.total_price)}
              </div>
            </div>
            
            <div className='payment-option-button'>
              {
                o.status === "PENDING"  &&
                <>
                  <Button
                      variant="outline-danger"
                      onClick={(e) => {
                        e.preventDefault()
                        props.handleDelete(o.id)
                      }}
                    >
                      Batalkan Pesanan
                    </Button>
                  <Link to={`/payment/confirm/order/${o.id}`}>
                  <Button variant="primary">Lihat Detail</Button>
                  </Link>
                </>
              }
              {
                o.status === "SUBMIT" &&
                <>
                  <Button variant="primary">Lihat Detail</Button>
                  <Button variant="primary">Proses Pesanan</Button>
                </>
              }
              {
                o.status === "CONFIRM" &&
                <>
                <Button variant="primary">Lihat Detail</Button>
                </>
              }
              {
                o.status === "CANCELED" &&
                <>
                <Button variant="primary">Lihat Detail</Button>
                <Button variant="primary">Sewa Lagi</Button>
                </>
              }
               {
                o.status === "COMPLETED" &&
                <>
                <Button variant="primary">Lihat Detail</Button>
                </>
              },
              {
                o.status === "REJECTED" &&
                <>
                <Button variant="primary">Lihat Detail</Button>
                </>
              }
            </div>

          </Card.Body>
        </Card>
      ))}



    </>
  )
}

