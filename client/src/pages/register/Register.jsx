import React, { useRef } from 'react';
import "./register.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate()

    const handleClick =async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCustomValidity("password not matched !")
        } else {
            
            const user = {
                username: username.current.value,
                email: email.current.value,
                password:password.current.value,
            }
            
         try {
             await axios.post("auth/register/", user); 
             navigate("/login");
       } catch (error) {
    console.log(error)
        }            
        }
}
  return (
        <div className='register'>
          <div className="registerWrapper">
              <div className="registerLeft">
                  <h3 className="registerLogo">RatanSocial</h3>
              <span className='registerDesc'>Connect with friends and the world around you on RatanSocial</span>
              </div>
              <div className="registerRight">
                  <form className="registerBox" onSubmit={handleClick}>
                      <input type="text"
                          placeholder="UserName"
                          className="registerInput"
                          required
                          ref={username}
                      />
                      
                      <input type="email"
                          placeholder="Email"
                          className="registerInput"
                          required
                          ref={email}
                      />
                      
                      <input type="password"
                          placeholder="password"
                          className="registerInput"
                          required
                          ref={password}
                          minLength="6"
                      />
                      
                      <input type="password"
                          placeholder="password Again"
                          className="registerInput"
                          required
                          ref={passwordAgain}
                      />
                      
                      <button type="submit" className="registerButton">Sign Up</button>

                      <span className="registerForgot">Already have an account?</span>

                      <Link to="/login">
                           <button className="registerLoginButton">Log In</button>
                      </Link>

                  </form>
              </div>
      </div>
    </div>
  )
}

export default Register
