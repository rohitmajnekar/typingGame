import React, {useState, Component, createContext} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-simple-keyboard/build/css/index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import {Login} from "./components/Login";
import {Signup} from "./components/Signup.js";

import Header from './components/Header'
import { Game } from './components/Game';
import Keyboard from "react-simple-keyboard";
import {UserContext} from "./components/UserContext";
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { Home } from './components/Home';
import { LeaderBoard } from './components/LeaderBoard';
import { Profile } from './components/Profile';

// var isUser = false;

const App =()=>{
  // const user= useSelector(selectUser)
  // if(user){
  //   isUser = true
  // }else{
  //   isUser = false
  // }
    return (
      <div>
          <Router>
            <Header/>
            <Switch>
              {/* <UserContext.provider */}
                <Route  key='4' path='/' exact component={Home}/>
                <Route  key='2' path='/game' exact component={GameScreen}/>
                <Route key='1' path='/login' exact component={Login}/>
                <Route key='3' path='/signup' exact component={Signup}/>
                <Route key='5' path='/leaderboard' exact component={LeaderBoard}/>
                <Route key='6' path='/profile' exact component={Profile}/>
            </Switch>
        </Router>
      </div>
    );
  }


 class  GameScreen extends Component{
  state = {
    layoutName: "default",
    input: ""
  };

  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
  };

  onKeyPress = button => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  handleShift = () => {
    const layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };
  render() {
        return (
            <>  
                <Game/>
                  <div className="container" style={{marginTop:"50px"}}>
                    <Keyboard
                      physicalKeyboardHighlightTextColor ="white"
                      physicalKeyboardHighlightBgColor= "#9ab4d0"
                      physicalKeyboardHighlightPress= {true}
                      physicalKeyboardHighlight= {true}
                      theme={"hg-theme-default myTheme1"}
                      layoutName={this.state.layoutName}
                      // onChange={input => this.onChange(input)}
                      onKeyPress={button => this.onKeyPress(button)}
                    />
                  </div>
            </>
      )
    }
}

// function App() {

//   const [loginStatus, setLoginStatus] = useState(false)

//   return (
//     <div className="App">
//       {/* <Router>
//         <div className="App">
//           <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//             <div className="container  d-flex justify-content-between">
//               <div><Link className="navbar-brand" to={"/sign-in"}>Word Game</Link></div>
//               <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//                 {loginStatus? "Rohit" : <NotLoggedIn/>}
//               </div>
//             </div>
//           </nav>

//           <div className="outer">
//             <div className="inner">
//               <Switch>
//                 <Route exact path='/' component={Login} />
//                 <Route path="/sign-in" component={Login} />
//                 <Route path="/sign-up" component={Signup} />
//               </Switch>
//             </div>
//           </div>
//         </div>
//         </Router> */}
        
//     </div>
//   );
// }


// const NotLoggedIn = ()=>{

//   return (
//     <ul className="navbar-nav ml-auto">
//                   <li className="nav-item">
//                     <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link className="nav-link" to={"/leaderboard"}>Leaderboard</Link>
//                   </li>
//                 </ul>
//   )
// }

export default App;
// render(<App />, document.getElementById("root"));
