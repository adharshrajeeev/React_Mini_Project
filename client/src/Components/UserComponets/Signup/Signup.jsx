import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import './Signup.css'
import { signUpPost } from '../../../utils/Constants';
import Swal from 'sweetalert2';

function Signup() {
    const navigate= useNavigate();
    const [userName,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword] = useState('');

    const handleSubmit=async (e)=>{
        

        const body=JSON.stringify({
            userName,
            email,
            password
        })
        e.preventDefault();

        if(userName=="" || email=="" || password==""){
            Swal.fire(
                'Please Fill the components?',
                'That thing is still around?',
                'question'
              )
        } else{

            try{
                let response= await axios.post(signUpPost,body,{ headers: { "Content-Type": "application/json" } })
                if(response.data.status=='ok'){
                    Swal.fire(
                        'Good job!',
                        'Signup Sucess!',
                        'success'
                      )
                   console.log(response.data);
                    navigate('/')
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
                        text: 'User Already Registered!',
                        
                      })
                    console.log("some error")
                }
                
    
            
    
           
            }
            catch(err){
                console.log(err);
                alert(err)
                console.log("ivdaa")
            }
        }
    }



    return (
       
        <div className='signInpage' >
        <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
        </div>
        <form className='loginForm' onSubmit={(e)=>handleSubmit(e)}>
            <h3 className='tag1'>Signup</h3>
            <label className='label1' for="username">User Name</label>
            <input className='input1' type="text"
                placeholder="userName "
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="username" />
            <label className='label1' for="username">Email</label>
            <input className='input1' type="text"
                placeholder="Email "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="username" />

            <label className='label1' for="password">Password</label>
            <input className='input1' type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password" />

            <button className='loginButton' type='submit'>Signup </button>
            <div className="social">
                <div className="go"><i className="fab fa-google"></i> <Link to={'/'}>Login</Link>  </div>
            </div>
        </form>
    </div>
    )
}

export default Signup