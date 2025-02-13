import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
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
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const [category, setCategory] = useState(0);
  const [key, setKey] = useState("");
  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(parseInt(e.target.value));
    console.log(e.target.value);
  };

  let navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("token");
    removeCookie("UserName");
    navigate("/admin-login");
  };
  const getCategories = () => {
    try {
      axios
        .get(`http://127.0.0.1:5050/api/categories`)
        .then((response) => {
          response.data.unshift({
            CategoryId: 0,
            CategoryName: "Select Category",
          });
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const getVideos = (category) => {
    try {
      if (category === 0) {
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
      } else {
        axios
          .get(`http://127.0.0.1:5050/api/videos/category/${category}`)
          .then(function (response) {
            // Handle the response data
            setVideos(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSearch = () => {
    if (key) {
      axios
        .get(`http://127.0.0.1:5050/api/videos/search/${key}`)
        .then(function (response) {
          // Handle the response data
          setVideos(response.data);
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      getVideos(0);
    }
  };
  useEffect(() => {
    if (!cookies["token"]) {
      navigate("/admin-login");
    } else {
      getCategories();
      getVideos(category);
    }
  }, [cookies, navigate, category]);

  return (
    <div className="bg-light p-2 m-2" style={{ height: "100vh" }}>
      <h3 className="d-flex justify-content-between">
        {" "}
        <div>
          <span>{cookies["UserName"]}</span>
          <span className="ms-2">Dashboard</span>
        </div>{" "}
        <div>
          <button onClick={handleLogout} className="btn btn-link">
            Signout
          </button>
        </div>{" "}
      </h3>
      <div className="row mt-2">
        <div className="col-2">
          <div className="input-group mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Videos"
              onChange={handleKeyChange}
            />
            <button
              onClick={handleSearch}
              className="btn btn-warning bi bi-search"
            >
              Search
            </button>
          </div>
          <div className="mt-3">
            <h5>Categories</h5>
            <select
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-10">
          <section className="d-flex flex-wrap">
            {videos.map((video) => (
              <div
                key={video.id}
                className="card m-2 p-2"
                style={{ height: "400px" }}
              >
                <div className="card-title text-center">
                  <h5 style={{ height: "30px" }}>{video.Title}</h5>
                </div>
                <div className="card-body">
                  <iframe
                    src={video.Url}
                    height="200px"
                    title={video.Title}
                    allowfullscreen="allowfullscreen"
                    mozallowfullscreen="mozallowfullscreen"
                    msallowfullscreen="msallowfullscreen"
                    oallowfullscreen="oallowfullscreen"
                    webkitallowfullscreen="webkitallowfullscreen"
                  ></iframe>
                </div>
                <div className="card-footer">
                  <span className="bi bi-eye-fill">{video.Views}</span>
                  <span className="bi bi-hand-thumbs-up mx-3">
                    {video.Likes}
                  </span>
                  <span className="bi bi-hand-thumbs-down">
                    {video.DisLikes}
                  </span>
                  <div>
                    <button className="bi bi-download btn">Watch Later</button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
