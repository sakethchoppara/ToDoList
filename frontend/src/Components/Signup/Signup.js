import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = ()=>{
    const nav = useNavigate('null')
    useEffect(()=>{
        const token = localStorage.getItem('jwt-token')
        if(token){
            nav('/app/todolist/')
        }
    },[])

    const handleSignup = () =>{
        const user = document.getElementById('user').value
        const pass1 = document.getElementById('pass1').value
        const pass2 = document.getElementById('pass2').value
        if(pass1 === pass2){
            fetch('/api/signup',{
                method:"POST",
                body:JSON.stringify({
                    "username":user,
                    "password":pass1
                }),
                headers:{
                    'Content-type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(res=>{
                if(!res.status){
                    document.getElementById('error').innerHTML = res.error
                }
                else{
                    document.getElementById('error').innerHTML = "successfull go to login page"
                }
            })
            .catch(err=>console.log(err))
        }
        else{
            document.getElementById('error').innerHTML = "please try again password does not match"
        }
    }

    const goToLogin = () => {
        nav('/app/login')
    }

    return(
        <div>
            <form>
                <label>Username</label>
                <input type="text" id="user" />
                <label  >password</label>
                <input id="pass1" type="password" />
                <label  >password again</label>
                <input id="pass2" type="password" />
            </form>
            <h1 id="error">Signup</h1>
            <button onClick={handleSignup} >Submit</button>
            <button onClick={goToLogin} >Login</button>
        </div>
    )
}


export default Signup