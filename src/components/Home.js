import React from 'react'
import { Link } from 'react-router-dom'
export const Home = () => {

    const style = {
        transform: "translate(750px, 300px)"
        
    }
    return (
        <div>
            <button style = {style} type="button"class="cancelbtn"><Link to='/game'>Start Game</Link></button>
        </div>
    )
}
