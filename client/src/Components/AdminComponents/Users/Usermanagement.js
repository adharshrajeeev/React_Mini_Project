import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import AdminHeader from '../Header/AdminHeader'
import axios from '../../../utils/axios'
import './users.css'
import { adminDeleteUser, admingetAllusers, adminSearchUser } from '../../../utils/Constants'
import { useNavigate } from 'react-router-dom';
import './userManagement.css'
import Swal from 'sweetalert2'

function Usermanagement() {

    const navigate=useNavigate()
    const [users,setUsers]=useState([])

    useEffect((key)=>{
        getUserLists();

    },[])

    const getUserLists = ()=>{
            axios.get(admingetAllusers).then((response)=>{
                setUsers(response.data.users)
            }).catch((err)=>{
                console.log("oops user catch client");

            })
    }


    const userSearch=(e)=>{
        let userr=e.target.value;
        console.log(userr);
        if(!userr){
            getUserLists();
        }else{
            axios.get(`${adminSearchUser}/${userr}`).then((res)=>{
                setUsers(res.data.users)
            })
        }
    }


    const deleteUser=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${adminDeleteUser}/${id}`).then((res)=>{
                    getUserLists();
                    
                })
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            }
          })
    }


    return (
        <div >
            <AdminHeader />
            <br/>
            
            <br/>
            <input class="form-control mb-3 w-25 searchadmin" onChange={userSearch} name="query" type="search" placeholder="Search" aria-label="Search"/>
                <button class=" addButtonAdmin" onClick={()=>navigate('/adminAddUser')} >add</button>
           
            <table id="customers">
                <tr>
                    <th class="w-5">No</th>
                    <th>User Name</th>
                    <th>Emaiil</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
               
                  {  users.map((obj,index)=>
                   <tr>
                    <td>{index+1}</td>
                    <td>{obj.userName}</td>
                    <td>{obj.email}</td>
                    <td>
                        <button className='editt' onClick={()=>navigate(`/updateUser/${obj._id}`)} >Edit</button>
                    </td>
                    <td> 
                        <button className='deletee' onClick={()=>deleteUser(obj._id)}>Delete</button>
                    </td>
                    </tr>
                  )}

                

            </table>
            <Footer />
        </div>
    )
}

export default Usermanagement