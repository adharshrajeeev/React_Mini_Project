import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios'
import { LoginPost } from '../../../utils/Constants';
import './Login.css'
import Swal from 'sweetalert2'
function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const body = JSON.stringify({
            email,
            password
        })
        e.preventDefault();

        if(email=="" || password ==""){
            Swal.fire(
                'Please Fill the components?',
                'That thing is still around?',
                'question'
              )
        }else{

            try {
                let user = await axios.post(LoginPost, body, { headers: { "Content-Type": "application/json" } })
    
    
                if (user.data.user) {
                    localStorage.setItem('token',user.data.user)
                    console.log(user.data,"thisis loginndata")
                    navigate('/home');
    
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credintaials!',
                        
                      })
                }
                    
                
            } catch (err) {
                console.log(err)
            }
        }

    }



    return (
        <div className='loginpage' >
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className='loginForm' onSubmit={(e)=>handleSubmit(e)}>
                <h3 className='tag1'>Login Here</h3>

                <label className='label1' for="username">Username</label>
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

                <button className='loginButton' type='submit'>Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> <Link to={'/signup'}>SIGNUP</Link>  </div>
                </div>
            </form>
        </div>
    )
}

export default Login