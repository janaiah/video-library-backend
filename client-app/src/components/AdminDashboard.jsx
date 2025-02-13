import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminDashboard = () => {
  const [videos, setVideos] = useState([
    {
      id: 0,
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      DisLikes: 0,
      Views: 0,
      CategoryId: 0,
      Comments: [],
    },
  ]);
  const [cookies, setCookie, removeCookie] = useCookies(["UserName", "token"]);
  let navigate = useNavigate();
  const handleSignout = () => {
    removeCookie("token");
    removeCookie("UserName");
    navigate("/admin-login");
  };
  useEffect(() => {
    if (!cookies["token"]) {
      navigate("/admin-login");
    } else {
      axios
        .get("http://127.0.0.1:5050/api/videos")
        .then(function (response) {
          // Handle the response data
          setVideos(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [cookies, navigate]);

  return (
    <div className="bg-light p-2 border border-1">
      <h3 className="d-flex justify-content-between">
        <div>
          <span>Admin Dashboard</span>
        </div>
        <div>
          <button onClick={handleSignout} className="btn btn-link">
            Signout
          </button>
        </div>
      </h3>
      <hr></hr>
      <div className="row">
        <div className="col-2 bg-light ">
          <ul className="list-unstyled">
            <li className="pt-2 my-1">
              <Link className="btn btn-dark w-100 " to="/categories">
                Categories
              </Link>
            </li>
            <li className="pt-2 my-1">
              <Link className="btn btn-dark w-100 " to="/users-list">
                Users
              </Link>
            </li>
            <li className="pt-2 my-1">
              <Link className="btn btn-dark w-100 " to="/admin-dash">
                Admin Dashboard
              </Link>
            </li>
            <li className="pt-2 my-1">
              <Link className="btn btn-dark w-100 " to="/user-dash">
                User Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-10">
          <section>
            <div className="ms-2">
              <Link
                to="/add-video"
                className="bi bi-camera-video btn btn-primary"
              >
                {" "}
                Add Video
              </Link>
            </div>
            <div>
              <table
                style={{ height: "600px" }}
                className="table table-hover overflow-auto"
              >
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Preview</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {videos.map((video) => (
                    <tr key={video.VideoId}>
                      <td>{video.Title}</td>
                      <td>
                        <iframe
                          width="200"
                          height="100"
                          src={video.Url}
                          allowfullscreen="allowfullscreen"
                          mozallowfullscreen="mozallowfullscreen"
                          msallowfullscreen="msallowfullscreen"
                          oallowfullscreen="oallowfullscreen"
                          webkitallowfullscreen="webkitallowfullscreen"
                          title={video.Title}
                        ></iframe>
                      </td>
                      <td>
                        <Link
                          to={`/edit-video/${video._id}`}
                          className="bi bi-pen-fill me-2 btn btn-warning"
                        ></Link>
                        <Link
                          to={`/delete-video/${video._id}`}
                          className="bi bi-trash-fill btn btn-danger"
                        ></Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
