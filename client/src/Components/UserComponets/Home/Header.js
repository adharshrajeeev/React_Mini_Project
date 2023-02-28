import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css';
import axios from '../../../utils/axios'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../../Redux/usernameReducer';
import { changeImage } from '../../../Redux/userimageReducer';
import { verifyUserToken } from '../../../utils/Constants';



function Header() {

    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleLogoutUser = (e) => {
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
                localStorage.clear();
                dispatch({ type: 'logout' })
                navigate('/')
            }
        })
    }

    useEffect(() => {

        const Token = localStorage.getItem('token');

        if (!Token) {
            navigate('/');

        } else {
            const body = JSON.stringify({ Token });
            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                // if (res.data.token) {
                   
                    dispatch(change(res.data.user.userName))
                    dispatch(changeImage(res.data.user.image))
                // } else {
                //     localStorage.removeItem('token');
                // }
            })
        }
    },  [dispatch]);

    const username = useSelector((state) => state.username)
    const userImage = useSelector((state) => {
        return state.userImage;

    })
    return (
        <nav class="navbar navbar-expand-lg  " style={{background:'#0d1116'}} >
            <div class="container-fluid">
                <Link to={"/home"}>
                <a className="navbar-brand" style={{color:'white'}}>
                   <img src={userImage} className='userLogo' style={{width:'30px'}}/>
                </a>
                </Link>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to={"/Profile"}>
                            <h6 class="nav-link active" aria-current="page" style={{color:'white'}}>My Profile</h6>
                            </Link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <span className='navUserName'>{username}</span>
                        <button className='userLogoutButton' onClick={handleLogoutUser} type="submit">logout</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header