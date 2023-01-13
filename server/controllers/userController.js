const express = require('express');
const User = require('../model/userMode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs')
const directoryPath = 'public/'
module.exports = {





    userSignup: async (req, res) => {


        try {
            let userEmail = req.body.email
            const users = await User.findOne({ email: userEmail })
            if (users) {
                res.json({ status: "userRegistered", error: "user already registered" })
            }
            else {

                const hashPassword = await bcrypt.hash(req.body.password, 10)
                const user = await User.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: hashPassword
                })
                res.json({ status: "ok", _id: user._id, name: user.userName })
            }

        } catch (err) {
            console.log("err", err)
            res.json({ status: 'error', error: "Duplicae email" })
        }
    },


    userLogin: async (req, res) => {

        try {

            const user1 = await User.findOne({ email: req.body.email })

            if (user1) {

                const passwordValid = await bcrypt.compare(req.body.password, user1.password)
                if (passwordValid) {

                    const token = jwt.sign({
                        name: user1.userName,
                        email: user1.email,
                        id: user1._id
                    },
                        'secret123',
                        {
                            expiresIn: "7d"
                        }
                    )

                    console.log("slodddoged in sucess")
                    res.json({ status: 'ok', message: "Login Sucess", user: token })
                } else {
                    console.log("user details invalid");
                    res.json({ status: 'error', error: 'userdetails invalid', user: false })

                }
            } else {
                res.json({ status: 'error', error: 'User Not found' })
            }

        } catch (err) {
            res.json({ status: 'error', error: "oops catch error" })
            console.log(err)
        }




    },

    verifyToken: async (req, res) => {
        try {

            const decodedToken = jwt.verify(req.body.Token, 'secret123')
            const user = await User.findOne({ email: decodedToken.email });

            if (user.image) {
                user.image = `http://localhost:4000/${user.image}`
            }
            else {
                user.image = `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }

            return res.status(200).json({ message: "token valid", user, token: true });



        } catch (err) {
            res.json({ status: 'error', error: "invalid token", token: false })
        }
    },

    userImageUpdate: async (req, res) => {
        try {
            let Token = req.params.id;
            let token2 = JSON.parse(Token)
            console.log(token2, "this is the Tokknen parseec")
            const decodedToken = jwt.verify(token2, 'secret123');
            console.log(decodedToken)
            const user = await User.findOne({ _id: decodedToken.id });
            if (user) {
                // const oldImage = user.image
                // console.log(oldImage,'is here the iseueueeee')
                // if(oldImage){    
                //     fs.unlink(directoryPath + oldImage, async (err) => {
                //         if (err) {
                //             throw err;
                //         }
                //     });
                //     const remove = await User.updateOne({ _id: decodedToken.id }, {
                //         $unset: { image: "" }
                //     })

                // }


                const update = await User.updateOne({ _id: decodedToken.id }, {
                    $set: {
                        image: req.files.image[0].filename
                    }
                })
                const image = `http://localhost:4000/${req.files.image[0].filename}`
                console.log(image, "hereeeeeeeeeeeeeeee");
                return res.status(200).json({ message: "user found", image });
            }
            else {
                return res.json({ status: "error", message: "photo coubldint updaete" })
            }

        } catch (err) {
            console.log(err, "this oneis catch photot")
            res.json({ status: "error", message: "photo catch error" })
        }
    }

}