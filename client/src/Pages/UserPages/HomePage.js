import React, { useEffect } from 'react'
import Header from '../../Components/UserComponets/Home/Header'
import Home from '../../Components/UserComponets/Home/Home'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { verifyUserToken } from '../../utils/Constants'


function HomePage() {
  const navigate=useNavigate()
  useEffect(()=>{
    const Token=localStorage.getItem('token');
    console.log(Token)
    if(!Token){
        navigate('/')
        console.log("ohh toe")
    }else{

      const body=JSON.stringify({Token});
    
      axios.post(verifyUserToken,body,{headers: {"Content-Type":"application/json"}}).then((response)=>{
        console.log(response,"this is repsoes")
        if(response.data.token){
          console.log("sucess");
        }else{
          navigate('/')
        }
      })
    }
  },[])
  return (
    <div>
      <Header/>
     <Home/>

    </div>
  )
}

export default HomePage