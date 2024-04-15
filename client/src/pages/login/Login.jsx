import React, { useContext, useRef } from 'react'
import "./login.css";
import { Link } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from "@mui/material";


const Login = () => {

    const email = useRef();
    const password = useRef();
    const {user,isFetching,dispatch}=useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        
        console.log(user)
    }
  return (
    <div className='login'>
          <div className="loginWrapper">
              
              <div className="loginLeft">
                  <h3 className="loginLogo">RatanSocial</h3>
              <span className='loginDesc'>Connect with friends and the world around you on RatanSocial</span>
              </div>

              <div className="loginRight">
                  <form className="loginBox"  onSubmit={handleClick}>
                      <input type="email"
                          placeholder="Email"
                          className="loginInput"
                          ref={email}
                          required />
                      
                      <input type="password"
                          placeholder="password"
                          className="loginInput"
                          minLength="6"
                          ref={password}
                          required />
                      
                      <button className="loginButton">{isFetching ? <CircularProgress color="secondary"/> : "Log In" }</button>
                      
                      <span className="loginForgot">Forgot Password?</span>

                      <Link to="/register" className='linkText'>
                          <button className="loginRegisterButton">Create a New Account</button>
                      </Link>
                  </form>
              </div>
      </div>
    </div>
  )
}

export default Login
