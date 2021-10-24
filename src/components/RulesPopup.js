import React from 'react'
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import './Rules.css'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

export const RulesPopup = ({title, children, open, setOpen, handleClose}) => {
    const user = useSelector(selectUser)
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle  >
                <div className='d-flex'>
                    <div className='flex-grow-1'>Title</div>
                    <div onClick={handleClose} style={{color:'red'}} >x</div>
                </div>
            </DialogTitle>
            <DialogContent>
            <div class="container">
                <h1>Rules:-</h1>
                <p>==>      There are 15 levels in this game.</p>
                <p>==>      To clear one level you have to type 10 correct words continuously.</p>
                <p>==>      After every 2 words multiplier will increase by 0.1</p>
                <p>==>      After typing wrong character multiplier will be reset.</p>
                <p>==>      In each level timer will decrease by 1 second.(range of timer:-15-1)</p>
                <p>==>      After typing characters [q,y,j,x,z] you will get 2 points extra.</p>
                </div>
                {user?<button type="button" onClick={handleClose} class="cancelbtn">Start</button>:<><button type="button"  class="cancelbtn"><Link to="/login"  style={{ textDecoration: 'none', color:'white' }} >Login</Link></button>
                <button type="button" onClick={handleClose} class="cancelbtn">Start As a Guest</button></>}
            </DialogContent> 
        </Dialog>
    )
}
