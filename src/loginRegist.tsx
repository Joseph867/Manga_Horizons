import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginRegist.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

interface LoginRegistProps {
  showLogin: boolean;
  showRegister: boolean;
  handleClose: () => void;
}

const LoginRegist: React.FC<LoginRegistProps> = ({ showLogin, showRegister, handleClose }) => {
  const [profilename, setProfilename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profilename, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setLoginError(data.error);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('profilename', data.profilename);
          console.log("login " + data.token);
          handleClose();
          window.location.reload();
        }
      });
  }

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch('http://localhost:3000/auth/regist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ profilename, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setLoginError(data.error);
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('profilename', data.profilename);
          console.log("register "+ data.token);
          handleClose();
          window.location.reload(); 
        }
      });
  }

  return (
    <>
      {showLogin && (
        <div className='popup'>
          <div className='popup-inner'>
            <button className='close-btn' onClick={handleClose}>Close</button>
            <div className="form-box login">
              <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="input-box">
                  <input type="text" placeholder='Username' onChange={e => setProfilename(e.currentTarget.value)} required />
                  <FaUser className='icon' />
                </div>
                <div className="input-box">
                  <input type="password" placeholder='Password' onChange={e => setPassword(e.currentTarget.value)} required />
                  <FaLock className='icon' />
                </div>
                <button className="btn btn-success" type='submit'>Login</button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showRegister && (
        <div className='popup'>
          <div className='popup-inner'>
            <button className='close-btn' onClick={handleClose}>Close</button>
            <div className="form-box register">
              <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="input-box">
                  <input type="text" placeholder='Username' onChange={e => setProfilename(e.currentTarget.value)} required />
                  <FaUser className='icon' />
                </div>
                <div className="input-box">
                  <input type="email" placeholder='Email' onChange={e => setEmail(e.currentTarget.value)} required />
                  <MdEmail  className='icon'/>
                </div>
                <div className="input-box">
                  <input type="password" placeholder='Password' onChange={e => setPassword(e.currentTarget.value)} required />
                  <FaLock className='icon' />
                </div>
                <button className="btn btn-success" type='submit'>Register</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginRegist;