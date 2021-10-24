import React, { useState ,createContext } from 'react';
import { useHistory } from 'react-router-dom';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import '../index.css';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';
import { selectUser } from '../features/userSlice';


export const Login = ({title, children, open, setOpen, handleClose}) => {
    const dispatch = useDispatch();
    // const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const goHome = () => history.push('/');

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginUser = async(e) => {
        e.preventDefault();
        // console.log(email,password)
        const res = await fetch('http://localhost:3001/login',{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email,password
            })

        }).then(res => res.json()).then(data => dispatch(login(data.result[0])));
        // console.log('result', res)
        // dispatch(login(res))
    }
    const user = useSelector(selectUser)

    return (
        <div className="container mt-5">
           {user?goHome():""}
            <form method='POST'>

            <h3>Log in</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button onClick={loginUser} className="btn btn-dark btn-lg btn-block">Sign in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
            </form>
       </div>
    )
}