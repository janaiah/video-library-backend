import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const AdminEditVideo = () => {
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const [videos, setVideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },
  ]);
  const [cookies, setCookie, removeCookie] = useCookies(["UserName", "token"]);
  let { id } = useParams();
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      VideoId: videos.VideoId,
      Title: videos.Title,
      Url: videos.Url,
      Description: videos.Description,
      Likes: videos.Likes,
      DisLikes: videos.DisLikes,
      Views: videos.Views,
      CategoryId: videos.CategoryId,
    },
    onSubmit: async (values) => {
      try {
        await axios
          .put(`http://127.0.0.1:5050/api/videos/${id}`, values, {
            headers: {
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
              Authorization: `Bearer ${cookies["token"]}`,
            },
          })
          .then((response) => {
            // console.log(response.data);
            alert("Video Updated Successfully");
            navigate("/admin-dash");
          });
      } catch (error) {
        console.error(error);
      }
    },
    enableReinitialize: true,
  });

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
  const getVideos = (id) => {
    try {
      console.log(`category id:${id}`);
      axios
        .get(`http://127.0.0.1:5050/api/videos/${id}`)
        .then((response) => {
          setVideos(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getVideos(id);
  }, [id]);
  return (
    <div className="bg-light p-2 m-5 w-25">
      <h3>Edit Video</h3>
      <form
        onSubmit={formik.handleSubmit}
        style={{ height: "500px" }}
        className="overflow-auto p-2"
      >
        <dl>
          <dt>Video Id</dt>
          <dd>
            <input
              type="number"
              value={formik.values.VideoId}
              onChange={formik.handleChange}
              name="VideoId"
              className="form-control"
            />
          </dd>
          <dt>Title</dt>
          <dd>
            <input
              type="text"
              value={formik.values.Title}
              onChange={formik.handleChange}
              name="Title"
              className="form-control"
            />
          </dd>
          <dt>Video Url</dt>
          <dd>
            <input
              type="text"
              value={formik.values.Url}
              onChange={formik.handleChange}
              name="Url"
              className="form-control"
            />
          </dd>
          <dt>Description</dt>
          <dd>
            <textarea
              rows="3"
              value={formik.values.Description}
              onChange={formik.handleChange}
              cols="20"
              name="Description"
              className="form-control"
            ></textarea>
          </dd>
          <dt>Likes</dt>
          <dd>
            <input
              type="number"
              value={formik.values.Likes}
              onChange={formik.handleChange}
              name="Likes"
              className="form-control"
            />
          </dd>
          <dt>DisLikes</dt>
          <dd>
            <input
              type="number"
              value={formik.values.DisLikes}
              onChange={formik.handleChange}
              name="DisLikes"
              className="form-control"
            />
          </dd>
          <dt>Views</dt>
          <dd>
            <input
              type="number"
              value={formik.values.Views}
              onChange={formik.handleChange}
              name="Views"
              className="form-control"
            />
          </dd>
          <dt>Category</dt>
          <dd>
            <select
              value={formik.values.CategoryId}
              onChange={formik.handleChange}
              name="CategoryId"
              className="form-control"
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </dd>
        </dl>
        <button type="submit" className="btn btn-success me-2">
          Save Video
        </button>
        <Link to="/admin-dash" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AdminEditVideo;
