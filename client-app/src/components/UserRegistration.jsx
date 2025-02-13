import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserRegistration = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      UserId: "",
      UserName: "",
      Password: "",
      Email: "",
      Mobile: "",
    },
    onSubmit: (user) => {
      axios
        .post("http://127.0.0.1:5050/api/auth/register", user)
        .then((response) => {
          
            if(response.status === 201)
            alert(response.data.message);         
            navigate("/admin-login");
          
        })
        .catch((error) => {
          console.log(error.status);
          if (error.status === 400) {
            alert(error.response.data.message);
          }
            
            console.log(error.response.data.message);
        });
      
    },
  });

  return (
    <div className="bg-light p-2 m-2 w-25">
      <h3>User Registration</h3>
      <form onSubmit={formik.handleSubmit} className="p-2">
        <dl>
          <dt>UserId:</dt>
          <dd>
            <input
              type="text"
              name="UserId"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt>UserName:</dt>
          <dd>
            <input
              type="text"
              name="UserName"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt>Password:</dt>
          <dd>
            <input
              type="password"
              name="Password"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt>Email:</dt>
          <dd>
            <input
              type="email"
              name="Email"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
          <dt>Mobile:</dt>
          <dd>
            <input
              type="text"
              name="Mobile"
              onChange={formik.handleChange}
              className="form-control"
            />
          </dd>
        </dl>
        <button type="submit" className="btn btn-warning">
          Register
        </button>
        <div className=" my-3">
          <Link to="/admin-login">Existing User Login</Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegistration;
