import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { adminPostLogin } from '../../utils/Constants';
import Swal from 'sweetalert2';

import './AdminLogin.css'

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleadminLogin = async (e) => {
        const body = JSON.stringify({
            email,
            password
        })
        e.preventDefault();


        if (email == "" || password == "") {
            Swal.fire(
                'Please Fill the components?',
                'That thing is still around?',
                'question'
            )
        } else {

            try {
                let admin = await axios.post(adminPostLogin, body, { headers: { "Content-Type": "application/json" } })
                if (admin.data.status == 'ok') {
                    navigate("/adminHome")
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credintaials!',
                    })
                }
            } catch (err) {
                alert(err)
            }
        }
    }


    return (

        <form onSubmit={(e) => handleadminLogin(e)} class="login-form">

            <h1>Admin Login</h1>

            <div class="input-fields">
                <input type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} class="input-box"  />
                <p>Admin Id </p>
            </div>

            <div class="input-fields">
                <input type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} class="input-box" />
                <p>Password</p>
            </div>

            <input type="submit" value="Login" class="btn" />

        </form>
    )
}

export default AdminLogin