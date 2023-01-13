import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminHeader.css';
import Swal from 'sweetalert2';
function AdminHeader() {

  const navigate=useNavigate();


  const adminLogout1=(e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Logout?',
        text: "Do you want to Logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
    }).then((result) => {
        if (result.isConfirmed) {
            
            navigate('/admin')
        }
    })
}
  return (
    <nav class="navbar navbar-expand-lg adminHeadernav">
    <div class="container-fluid">
      <a class="navbar-brand" href="/adminHome" style={{color:"white"}} >WELCOME ADMIN</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
           
          </li>
          <li class="nav-item dropdown">
           
            <ul class="dropdown-menu">
             
            </ul>
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
        <form class="d-flex" >
         
          <button class="adminLogoutBtn" onClick={adminLogout1} >Logout</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default AdminHeader