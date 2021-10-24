import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { login } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


export const Signup = () => {
    const dispatch = useDispatch();
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory();
    const goHome = () => history.push('/');

    const user = useSelector(selectUser)
    const SignupUser = async(e) => {
        e.preventDefault();
        // console.log(email,password)
        const res = await fetch('http://localhost:3001/signup',{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                fname,lname,email,password,highscore:'0', nogame:'0', matchesplayed:0
            })
        });
        const data =  res.json();

        if( data.status === 400 || !data ){
            window.alert("Invalid Credentials");
            console.log("Invalid");
        }else{
            data.then(data =>{
                dispatch(login(data))
            })
            console.log(data);
        }
    }


    return (
        <div className="container mt-5">
            {user?goHome():""}
            <form>
                <h3>Register</h3>
                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={(e)=>setFname(e.target.value)} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={(e)=>setLname(e.target.value)} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"  onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"  onChange = {(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <button onClick={SignupUser} className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <Link to='/login'>log in?</Link>
                </p>
            </form>
        </div>
    )
}
