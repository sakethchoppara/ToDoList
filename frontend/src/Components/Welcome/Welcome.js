import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css"


const Welcome = ()=>{
    const nav = useNavigate(null)
    useEffect(()=>{
        const token = localStorage.getItem('jwt-token')
        if(token){
            nav('/app/todolist/')
        }
    },[])

    const handleNav=(e)=>{
        if(e.target.innerHTML==='Login'){
            nav('login/')
        }
        else{
            nav('signup/')
        }
    }

    return(
        <div className="welcome-body">
            <svg  width="1500" height="500" viewBox="0 0 1500 500" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(90)">
                    <stop offset="10%"  stop-color="#23022F" />
                    <stop offset="90%" stop-color="#111111" />
                    </linearGradient>
                </defs>
                <path d="M 0,0
                        L 0,250
                        Q 750,500 1500,250
                        L 1500, 0
                        Z" fill="url('#myGradient')" />
            </svg>
            <div className="holder">
                <p className="heading">TodoList</p>
                <div className="body">
                    <div className="login">
                        <button onClick={handleNav} ><h2>Login</h2></button>
                    </div>
                    <div className="signup">
                        <button onClick={handleNav} ><h2>Signup</h2></button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Welcome