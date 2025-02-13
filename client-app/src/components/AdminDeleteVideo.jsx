import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCookies } from "react-cookie";
const AdminDeleteVideo = () => {
const [videos,setVideos]=useState([{VideoId:0,Title:'',Url:'',Description:'',Likes:0,Dislikes:0,Views:0,CategoryId:0}]);
const [cookies, setCookie, removeCookie] = useCookies(["UserName", "token"]);
    let {id}=useParams();
    let navigate=useNavigate();
    const getVideos=(id)=>{
        try{
               console.log(`category id:${id}`);
            axios.get(`http://127.0.0.1:5050/api/videos/${id}`).then(response=>{
                setVideos(response.data);
                console.log(response.data);
            }).catch(error=>{
                console.log(error);
            })
        }
        catch(error){
            console.error(error);
        }
     }
     useEffect(()=>{
         getVideos(id);
      },[id]);
      function handleDeleteClick(){
        axios.delete(`http://127.0.0.1:5050/api/videos/${id}`,  {
            headers:{
               // 'Authorization': `Bearer ${localStorage.getItem('token')}`
               'Authorization': `Bearer ${cookies['token']}`
            }}).then(response=>{
                console.log(response);
                alert('Video Deleted Successfully');
                navigate('/admin-dash');

        }).catch(error=>{console.error(error)});
        ;
      }
  return (
    <div className='bg-light p-2 m-2 w-25' >
      <h3>
        Are you sure, you want to delete this video?
      </h3>
      <dl>
        <dt>Video Id:</dt>
        <dd>{videos.VideoId}</dd>
        <dt>Title:</dt>
        <dd>{videos.Title}</dd>
        <dt>Url:</dt>
        <dd>{videos.Url}</dd>
        <dt>Description:</dt>
        <dd>{videos.Description}</dd>
      </dl>
      <button onClick={handleDeleteClick} className='btn btn-danger'>Yes</button>
      <Link to='/admin-dash' className='btn btn-warning ms-2'>No</Link>
    </div>
  )
}

export default AdminDeleteVideo
