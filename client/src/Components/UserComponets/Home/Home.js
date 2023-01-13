import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import './Home.css'

function Home() {

    const username=useSelector((state=>state.username))

   

  return (
    <div id="carouselExampleControls" class="carousel slide " data-bs-ride="carousel" >
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://github.githubassets.com/images/modules/site/home-campaign/hero-bg.webp" class="d-block w-100 homePageImage" alt="..."/>
      <span class="homeHeader">WELCOME HOME </span>
      <span class="homeName">{username}...</span>
    </div>
   
  </div>
  
</div>
 
  )
}

export default Home