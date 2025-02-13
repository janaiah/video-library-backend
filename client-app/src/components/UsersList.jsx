import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:5050/api/users/").then(async (response) => {
      setUsers(await response.data);
    });
  }, []);
  return (
    <div className="bg-light m-2 p-2">
      <h3>Users List</h3>
      <div className="mt-2">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UserId}>
                <td>{user.UserId}</td>
                <td>{user.UserName}</td>
                <td>{user.Email}</td>
                <td>{user.Mobile}</td>
                <td>{user.Role}</td>
                <td>
                  <Link className="btn btn-warning bi bi-pen-fill"></Link>
                  <link className="ms-2 btn btn-danger bi bi-trash"></link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
