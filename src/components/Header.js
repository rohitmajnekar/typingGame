import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link, Switch, useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import { logout, selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  const [isOpen, setOpen] = useState(false);
  const [log, setLog] = useState(true);
  const history = useHistory();
  const handleClose = () =>{
        setOpen(false);
    }
  
  const user = useSelector(selectUser)
  const dispatch = useDispatch()


  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link style={{ textDecoration: 'none', color:'white' }} to="/">Word Game</Link>
            <Link style={{ textDecoration: 'none', color:'white', marginLeft: "50px" }} to="/home">Home</Link>
            <Link style={{ textDecoration: 'none', color:'white', marginLeft: "10px" }} to="/leaderboard">LeaderBoard</Link>
            <Link style={{ textDecoration: 'none', color:'white', marginLeft: "10px" }} to="/aboutus">AboutUs</Link>
          </Typography>
          {user?
            <>
              <Link style={{ textDecoration: 'none', color:'white' }} to="/profile">Profile</Link>
              <div style={{ textDecoration: 'none', color:'white', marginLeft: "10px"  }}  onClick={()=>{dispatch(logout())
                                                                                                        history.push('/')}}>Logout</div>
            </>
            :
            <>
              <Link style={{ textDecoration: 'none', color:'white' }} to="/login">Login</Link>
              <Link style={{ textDecoration: 'none', color:'white', marginLeft: "10px" }} to="/signup">SignUp</Link>
            </>
            }
          
          {/* {log?<Button onClick={() => setOpen(true)} color="inherit" ></Button>:"User Fav Read"} */}

        </Toolbar>
      </AppBar>
      {/* <LoginPopup open = {isOpen} openPopup={setOpen} handleClose = {handleClose}>

      </LoginPopup> */}
    </div>
  );
}