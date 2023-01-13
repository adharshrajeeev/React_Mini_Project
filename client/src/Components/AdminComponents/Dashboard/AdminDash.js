import React, { Fragment } from 'react'
import Footer from '../Footer/Footer'
import {Link} from 'react-router-dom'
import AdminHeader from '../Header/AdminHeader'
import './AdminDash.css'


function AdminDash() {

  return (
   <Fragment>
<AdminHeader />
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="https://images.hdqwalls.com/wallpapers/dark-blue-green-gradient-4k-i4.jpg" class="d-block  adminHomePage1" alt="..."/>
    <span class="homeHeader1">USER LISTS </span>
    <Link to={'/users'}><button class="homeName2">users</button></Link>
  </div>
</div>
</div>

<Footer/>
    
   </Fragment>
     /* <div className='body1'>
        <h1 className='main1'>USER LISTS</h1>
        <Link to={'/users'}><button  className='main2'>Users</button></Link>
        
      </div> */




  )
}

export default AdminDash