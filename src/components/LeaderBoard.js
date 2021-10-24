import React, { useState,useEffect } from 'react'
import './Leaderboard.css'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

export const LeaderBoard = () => {


    const user = useSelector(selectUser)
    const [users, setUsers] = useState({})

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async() => {
        // console.log(email,password)
        const res = await fetch('http://localhost:3001/getalluserscore',{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                
            })
        });
        const data =  res.json();
        if( data.status === 400 || !data ){
            window.alert("Invalid Credentials");
            console.log("Invalid");
        }else{
            await data.then(data =>{
                setUsers(data.result)
            })
        }
        console.log(users);
    }


    return (
        <div className='container'>
            <h2 >Leader Board</h2>
            <table>
            <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Total Game played</th>
            </tr>
            {users.length>0?users.map((user) =>{
                return <ScoreList gameplayed={user.matchesplayed} name={user.fname} score={user.highscore}/>

            }):""}
            </table>
        </div>
    )
}

const ScoreList = ({score, name, gameplayed}) =>{

    return (
        <>
            <tr>

                <td>{name}</td>
                <td>{score}</td>
                <td>{gameplayed}</td>
            </tr>
        </>
    )
}
