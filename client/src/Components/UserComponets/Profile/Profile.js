
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { imageUpload, verifyUserToken } from '../../../utils/Constants';
import { changeImage } from '../../../Redux/userimageReducer';
import { change } from '../../../Redux/usernameReducer';
import axios from '../../../utils/axios'
import Header from '../Home/Header';
import Swal from 'sweetalert2';
import './Profile.css'


function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [image, setImage] = useState('')
    

   

    const userImage = useSelector((state) => {
        return state.userImage;

    })

    useEffect(() => {

        const Token = localStorage.getItem('token');

        if (!Token) {
            navigate('/');

        } else {
            const body = JSON.stringify({ Token });
            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                // if (res.data.token) {
                        setName(res.data.user.userName)
                    setemail(res.data.user.email)
                    setImage(res.data.user.image)
                    dispatch(change(res.data.user.userName))
                    dispatch(changeImage(res.data.user.image))
                // } else {
                //     localStorage.removeItem('token');
                // }
            })
        }
    }, [navigate, dispatch]);




    const addImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',

            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })

        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({

                    title: "img",
                    imageUrl: e.target.result,
                    imageHeight: 400,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    denyButtonText: `Change`,
                }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        uploadimg(file)

                    } else if (result.isDenied) {
                        addImage()
                    }
                })
            }
            reader.readAsDataURL(file)
        }
        function uploadimg(file) {
            const Token2 = localStorage.getItem("token");
            let Stoken = JSON.stringify(Token2)
            let formData = new FormData();
            formData.append("image", file)
            axios.post(`${imageUpload}/${Stoken}`, formData,).then((res) => {
                setImage(res.data.image)
                dispatch(changeImage(res.data.image))
            }).catch((err) => {
                console.log(err);
            })
        }


    }

    return (
        <div>
            <Header />
            <div class="container rounded bg- mt-5 mb-5 profilepage">
                <div class="row">
                    <div class="col-md-4 border-right">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img class="rounded-circle mt-5" width={150} src={userImage} alt="profile photo" />
                            <span class="font-weight-bold">{email}</span>
                            <span class="text-black-50"></span>
                            <span>
                               



                                <button onClick={addImage} type="button" class="btn btn-primary" >
                                    Update Image
                                </button>


                                </span></div>
                    </div>
                    <div class="col-md-8 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-2">
                                <div class="col-md-6"><label class="labels">Name</label><input class="form-control" value={name} /></div>

                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6"><label class="labels">Email</label><input class="form-control" value={email} /></div>

                            </div>
                           
                        </div>
                    </div>
                    <div class="col-md-4">

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile