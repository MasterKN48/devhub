// reg user
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS,SET_CURRENT_USER} from './types';
export const registerUser=(userData,history)=> dispatch=>{
    axios
        .post("/api/users/register",userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dispatch({
                type:GET_ERRORS,
                payload: err.response.data
            })
        );
    
}

// Login - Get User Token

export const loginUser= userData =>dispatch=>{
    axios.post('/api/users/login',userData)
    .then(res =>{
        // save to localStorage
        const {token} =res.data;
        // set token to ls //only take string
        localStorage.setItem('jwtToken',token);
        // set token to Auth Header
        setAuthToken(token);
        // decode token to get user data
        const decoded=jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));

    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload: err.response.data
    }))
}

// set logged in user
export const setCurrentUser=(decoded)=>{
    return {
        type: SET_CURRENT_USER,
        payload:decoded
    }
}

// log user out
export const logoutUser=()=> dispatch=>{
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // remove auth header for future request
    setAuthToken(false);
    // set current user to {} and isAuthenicated == false
    dispatch(setCurrentUser({}));
}