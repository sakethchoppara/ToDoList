import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './Login.css'

const Login = ()=>{
    const nav = useNavigate(null);
    useEffect(()=>{
        const token = localStorage.getItem('jwt-token')
        if(token){
            nav('/app/todolist/')
        }
    },[])
    const handleLogin = ()=>{
        const user = document.getElementById('username').value
        const pass = document.getElementById('pass').value
        fetch('/api/login',{
            method:"POST",
            body:JSON.stringify({
                'login':true,
                "username":user,
                "password":pass
            }),
            headers:{
                'Content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.status){
                localStorage.setItem('jwt-token',res.token)
                nav(`/app/todolist/`)
        }
        else{
            console.log(res.error)
        }
        })
        .catch(err=>console.log(err))
    }

    const goToSignup = () => {
        nav('/app/signup')
    }


    return(
        <div>
            {/* <form>
                <label>Username</label>
                <input id="username" type="text" />
                <label>Password</label>
                <input id="pass" type="password" />
            </form>
            <button onClick={handleLogin} >Login</button>
            <button onClick={goToSignup} >sign up</button> */}
            	<div className="limiter">
		<div className="container-login100" >
			<div className="wrap-login100">
				<div className="login100-form validate-form">

					<span className="login100-form-title p-b-34 p-t-27">
						Log in
					</span>

					<div className="wrap-input100 validate-input" data-validate = "Enter username">
						<input className="input100" type="text" id="username" name="username" placeholder="Username"/>
						<span className="focus-input100" data-placeholder="&#xf207;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input className="input100" type="password" id="pass" name="pass" placeholder="Password"/>
						<span className="focus-input100" data-placeholder="&#xf191;"></span>
					</div>

					<div className="container-login100-form-btn">
						<button className="login100-form-btn" onClick={handleLogin}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
        </div>
    )
}

export default Login