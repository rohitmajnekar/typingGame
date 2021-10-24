import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import './Leaderboard.css'

export const Profile = () => {

    const user = useSelector(selectUser)
    const [scores, setScores] = useState({})
    useEffect(() => {
        getScores();
    }, [])
    const getScores = async(e) => {
        // console.log(email,password)
        if (!user){
            return
        }
        const res = await fetch('http://localhost:3001/getuserscore',{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email:user.email
            })
        });
        const data =  res.json();
        if( data.status === 400 || !data ){
            window.alert("Invalid Credentials");
            console.log("Invalid");
        }else{
            await data.then(data =>{
                setScores(data.result)
            })
        }
        console.log(scores);
    }


    return (
        <div className='container'>
            <h2>User Saved Scored</h2>
            <table>
            <tr>
                <th>Score</th>
            </tr>
            {scores.length>0?scores.map((score) =>{
                return <ScoreList data={score} name={user.fname}/>

            }):""}
            </table>
        </div>
    )
}

const ScoreList = ({data, name}) =>{

    return (
        <>
            <tr>

                <td>{name}</td>
                <td>{data.score}</td>
            </tr>
        </>
    )
}