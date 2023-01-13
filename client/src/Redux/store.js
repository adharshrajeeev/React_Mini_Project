import {configureStore} from '@reduxjs/toolkit';
import userimageReducer from './userimageReducer';
import usernameReducer from './usernameReducer';

console.log('returning to store');

const store=configureStore({
    reducer:{
        username:usernameReducer
        ,
        userImage:userimageReducer,

    },
})

export default store;