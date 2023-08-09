import React, { useState, useEffect } from "react";
import "./Form_post.css";
import axios from "axios";

//For GET  data --> GET METHOD
const Form_data = () => {
  const [data, setData] = useState([{}]);

  //useEffect uses for  fetching data and directly updating the DOM.The useEffect Hook is called every time the component renders.
  useEffect(() => {
    getUser();
  }, []);
  console.log(data, "data");
  //useEffect will keep getting called if we don't pass the dependency array because useEffect is executed only once per render cycle, but you have several state updates in your useEffect which cause a re-render. Hence you get a lot of alerts. useEffect executes on every re-render if you don't pass the dependency array.

  const getUser = async () => {
    await axios
      .get("http://localhost:5000/contact") //get from this api

      .then((res) => setData(res.data)); //[setData -->set--> for (res.data)]if this api call and if we got any response then data going to ba save in "setData"
  };

  //For Delete Data using id --> Delete Method
  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:5000/contact/" + id)
      .then((res) => alert("deleted successfully"));
    getUser();
  };

  //For add Data --> using POST Method
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  //For Update Data using state
  const [updateData, setUpdateData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    id: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    let response = await axios.post("http://localhost:5000/contact", formData);

    if (response) {
      alert("Data Added successfully");
    } else {
      alert("Something went wrong!!");
    }

    setFormData({
      name: "",
      mobile: "",
      email: "",
      password: "",
    });
    getUser();
  };

  //For Update Data using PUT METHOD
  const handleUpdate = async () => {
    await axios
      .put(`http://localhost:5000/contact/${updateData.id}`, updateData)
      .then((res) => {
        alert("Data Updated Successfully!");
        getUser();
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <h1 className="text-center"> Form Details</h1>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Full Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.name}
            // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onChange={handleChange}
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Mobile
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div class="mb-3">
          <button className="btn btn-success" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
      <div>
        <h1>Get Data Details</h1>
        <table class="table  table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email-address</th>
              <th scope="col">Mobile</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => (
                <tr>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* EDIT AND UPDATE DATA USING  PUT METHOD */}
                    <button
                      className="btn btn-info"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        setUpdateData({
                          name: user.name,
                          email: user.email,
                          mobile: user.mobile,
                          password: user.password,
                          id: user.id,
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Data
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={updateData.name}
                  // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onChange={handleChange}
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={updateData.mobile}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, mobile: e.target.value })
                  }
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={updateData.email}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, email: e.target.value })
                  }
                />
              </div>

              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleFormControlInput1"
                  value={updateData.password}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => handleUpdate()}
              >
                Save Update Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_data;
