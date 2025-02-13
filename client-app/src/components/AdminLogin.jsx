import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminLogin = () => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["UserName", "token"]);
  const formik = useFormik({
    initialValues: {
      UserId: "",
      Password: "",
    },
    onSubmit: (admin) => {
      axios
        .post("http://127.0.0.1:5050/api/auth/login", {
          UserId: admin.UserId,
          Password: admin.Password,
        })
        .then(async (response) => {
          console.log(await response.data);
          let user = await response.data;
          if (!user) {
            alert("Invalid User Id / Password");
          } else {
            if (user.role === "admin") {
              setCookie("UserName", admin.UserId);
              setCookie("token", user.token);
              navigate("/admin-dash");
            } else {
              navigate("/user-dash");
              setCookie("UserName", admin.UserId);
              setCookie("token", user.token);
            }
          }

          // let user=await response.data.find(item=>item.UserId===admin.UserId);
          // if(user){
          //     if(user.Password===admin.Password){
          //         navigate('/admin-dash');
          //     }else{
          //         alert('Invalid Password');
          //     }
          // }else{
          //     alert('Invalid User Id');
          // }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });
  return (
    <div className="bg-light p-2 m-2 w-25">
      <h3>Admin Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl>
          <dt>Username:</dt>
          <dd>
            <input
              type="text"
              name="UserId"
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
        </dl>
        <button type="submit" className="btn btn-warning w-100  ">
          Login
        </button>
        <div className="mt-2">
          <Link to="/">Back to Home</Link>
        </div>
        <div className="mt-2">
          <Link to="/user-registration">New User?</Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
