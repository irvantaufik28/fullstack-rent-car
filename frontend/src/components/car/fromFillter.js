import "../styles/homepage.css";
import "../styles/findcar.css";
import { useState } from "react";

export default function FromOption(props) {

  const [form, setForm] = useState({
    name: '',
    category: '',
    isRented: '',
    maxPrice:''

  })

  return (
    <>

      <div className="container seacrh-car">
        <form className="table-option" onSubmit={(e) => {
          e.preventDefault()
          props.onSubmit(form)
        }}>
          <div className="grid-input">
            <label htmlFor="inputEmail4" className="form-label">
              Nama Mobil
            </label>
            <input
              type="nama mobil"
              className="form-control"
              id="inputNamaMobil"
              placeholder="ketik nama/type mobil"
              onChange={e => setForm({
                ...form,
                ...{
                  name: e.target.value
                }
              })}
            />
          </div>
          <div className="grid-input">
            <label htmlFor="inputState" className="form-label">
              Category
            </label>
            <select id="inputState" 
            className="form-select"
            onChange={e => setForm({
              ...form,
              ...{
                category: e.target.value
              }
            })}
            >
              <option value="">Masukan Kapasitas Mobil</option>
              <option value="small">2 - 4 orang</option>
              <option value="medium">4 - 6 orang</option>
              <option value="large">6 - 8 orang</option>
            </select>
          </div>
          <div className="grid-input">
            <label htmlFor="inputState" className="form-label">
              Harga
            </label>
            <select id="inputState" 
            className="form-select"
            onChange={e => setForm({
              ...form,
              ...{
                maxPrice: e.target.value
              }
            })}
            >
              <option value="">Masukan Harga Per Hari</option>
              <option value="400000">&lt; Rp.400000</option>
              <option value="500000">Rp.400000 - Rp.600000</option>
              <option value="600000">&gt; Rp.600000</option>
            </select>
          </div>
          <div className="grid-input">
            <label htmlFor="inputState" className="form-label">
              Status
            </label>
            <select id="inputState" 
            className="form-select"
            onChange={e => setForm({
              ...form,
              ...{
                isRented: e.target.value
              }
            })}
            >
              <option value="">Pilih Status Mobil</option>
              <option value="false">free</option>
              <option value="true">disewa</option>
            </select>
          </div>

          <div className="grid-input">
            <button type="submit" className="btn btn-primary">
              cari mobil
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

FromOption.defaultProps = {
  onSubmit: () => { }
}
