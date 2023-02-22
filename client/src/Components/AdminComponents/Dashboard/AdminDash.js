import React, { Fragment } from 'react'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import AdminHeader from '../Header/AdminHeader'
import './AdminDash.css'


function AdminDash() {

  return (
    <Fragment>
      <AdminHeader />
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.hdqwalls.com/wallpapers/dark-blue-green-gradient-4k-i4.jpg" className="d-block  adminHomePage1" alt="..." />
            <span className="homeHeader1">USER LISTS </span>
            <Link to={'/users'}><button className="homeName2">users</button></Link>
          </div>
        </div>
      </div>

      <Footer />

    </Fragment>
    /* <div classNameName='body1'>
       <h1 classNameName='main1'>USER LISTS</h1>
       <Link to={'/users'}><button  classNameName='main2'>Users</button></Link>
       
     </div> */




  )
}

export default AdminDash