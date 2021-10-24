import React,{useEffect} from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import './GameOver.css'
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

export const GameOverPopup = ({score, open, handleClose}) => {

    const history = useHistory();
    const goHome = () => history.push('/');
    const user = useSelector(selectUser)
    useEffect(() => {
        // console.log(+user.highscore  +score)
        console.log("hellow")
        fetch('http://localhost:3001/incrementprofile',{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email:user.email
            })

        }).catch(err=>{console.log(err)});
    }, [])
    useEffect(() => {
        // console.log(+user.highscore  +score)
        if (open && user && parseInt(user.highscore) < parseInt(score)){
            console.log("hellow")
            fetch('http://localhost:3001/updatehighscore',{
                method :"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email:user.email,score
                })

            }).catch(err=>{console.log(err)});
        }
    }, [open])
    const saveScore =async()=>{
        console.log(user)
        const res = await fetch('http://localhost:3001/submitscore',{
                method :"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({
                    email:user.email,score
                })

            }).catch(err=>{console.log(err)});
            goHome();
        }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle  >
                <div className='d-flex'>
                    <div className='flex-grow-1'>GameOver</div>
                    <div onClick={handleClose} style={{color:'red'}} >x</div>
                </div>
            </DialogTitle>
            <DialogContent>
                <div class="container"  style={{padding: '200px'}}>
                <h1> Score : {score}</h1>
                </div>
                <button type="button" onClick={handleClose} class="cancelbtn">PlayAgain</button>
                {user?<button type="button" onClick={saveScore} class="cancelbtn">SaveScore</button>: <button type="button" class="cancelbtn"><Link style={{ textDecoration: 'none', color:'white' }} to="/login">Login</Link></button>}
            </DialogContent> 
        </Dialog>
    )
}
