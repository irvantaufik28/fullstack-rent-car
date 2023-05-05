import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
export default function AddCar(props) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    files: [],
  });

  
  const selectFiles = (e) => {
    const selectedFiles = e.target.files;
    const newFormData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      newFormData.append("uploadImages", selectedFiles[i]);
    }
    setFormData({ ...formData, ...{ files: Array.from(selectedFiles) } });
  };

  
  return (
    <>
      <div className="container">
        <div className="form-add-car">
          <h5>Add Car</h5>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              props.onSubmit(formData)
            }}
          >
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nama/Tipe Mobil</Form.Label>
              <Form.Control
                type="text"
                placeholder="input Nama/Tipe Mobil"
                name="name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ name: e.target.value },
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Harga</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input Harga Sewa Mobil"
                name="price"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{ price: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={selectFiles}
                // onChange={(e) =>
                //   setFormData({
                //     ...formData,
                //     ...{ files: Array.from(e.target.files) },
                //   })
                // }
              />
            </Form.Group>

            <div className="grid-input">
              <label htmlFor="inputState" className="form-label">
                Category
              </label>
              <select
                id="inputState"
                className="form-select"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ...{
                      category: e.target.value,
                    },
                  })
                }
              >
                <option value="">Pilih Kategori Mobil</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </select>
            </div>

            <div className="d-grid gap-2 addcar-button">
              <Button type="sumbit" variant="custome">
                Add Car
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
