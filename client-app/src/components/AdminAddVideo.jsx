import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import { useCookies } from "react-cookie";

const AdminAddVideo = () => {
    const [categories,setCategories]=useState([{CategoryId:0,CategoryName:''}]);
    const [cookies, setCookie, removeCookie] = useCookies(["UserName", "token"]);
    const navigate=useNavigate();
    const formik=useFormik({
        initialValues:{
            VideoId:0,Title:'',Url:'',Description:'',Likes:0,DisLikes:0,Views:0,CategoryId:0
        },
        onSubmit:(video)=>{
               axios.post(`http://127.0.0.1:5050/api/videos`,video,{
                headers:{
                   // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                   'Authorization': `Bearer ${cookies['token']}`
                }
            }).then(response=>{
                console.log(response.data);
                alert('Video Added Successfully');
                navigate('/admin-dash');
               }).catch(error=>{
                console.log(error);
               }); 
        }
    });

useEffect(()=>{
    axios.get(`http://127.0.0.1:5050/api/categories`)
  .then(function (response) {
    // Handle the response data
    response.data.unshift({CategoryId:0,CategoryName:'Select Category'});
    setCategories(response.data);
    console.log(response.data);
  })
  .catch(function (error) {   
    console.error(error);
  });
},[]);

  return (
    <div className='bg-light p-2 m-5 w-25'>
        <h3>Admin Add New Video</h3>
      <form onSubmit={formik.handleSubmit} style={{height:"500px"}} className='overflow-auto p-2'>
        <dl>
            <dt>Video Id</dt>
            <dd><input type='number' onChange={formik.handleChange}  name='VideoId' className='form-control' /></dd>
            <dt>Title</dt>
            <dd><input type='text' onChange={formik.handleChange} name='Title' className='form-control' /></dd>
            <dt>Video Url</dt>
            <dd><input type='text' onChange={formik.handleChange} name='Url' className='form-control' /></dd>
            <dt>Description</dt>
            <dd><textarea rows="3" onChange={formik.handleChange} cols="20" name='Description' className='form-control'></textarea></dd>
            <dt>Likes</dt>
            <dd><input type='number' onChange={formik.handleChange} name='Likes' className='form-control' /></dd>
            <dt>DisLikes</dt>
            <dd><input type='number' onChange={formik.handleChange} name='DisLikes' className='form-control' /></dd>
            <dt>Views</dt>
            <dd><input type='number'onChange={formik.handleChange} name='Views' className='form-control' /></dd>
            <dt>Category</dt>
            <dd>
                <select onChange={formik.handleChange} name='CategoryId' className='form-control'>
                {
                    categories.map(category=><option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
                }
            </select>
            </dd>       
            
            
        </dl>
        <button type='submit' className='btn btn-success me-2'>Add Video</button>
        <Link to='/admin-dash' className='btn btn-danger'>Cancel</Link>
      </form>
    </div>
  )
}

export default AdminAddVideo
