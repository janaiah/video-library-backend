import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Categories = () => {
    const [categories,setCategories]=useState([{CategoryId:0,CategoryName:''}])

    useEffect(()=>{
        axios.get('http://127.0.0.1:5050/api/categories').then( async response=>{
            setCategories(await response.data)
        });

    },[])
  return (
    <div className='bg-light p-2 m-2'>
      <h3>Categories</h3>
      <div className='mt-2'>
            <table className='table table-hover' >
                <thead >
                <tr >
                    <th>Category</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {
                        categories.map(category=><tr key={category.CategoryId}><td>{category.CategoryName}</td><td><Link className='btn btn-warning bi bi-pen-fill'></Link ><link className='ms-2 btn btn-danger bi bi-trash'></link></td></tr>)
                    }
                </tbody>
            </table>
      </div>
    </div>
  )
}

export default Categories
