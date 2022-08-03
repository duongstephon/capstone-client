import React, {useState} from 'react';
import axios from 'axios';
import './LoginModal.scss';

const API_URL = process.env.REACT_APP_API_URL;

const LoginModal = ({isShowing, hide, setIsLoggedIn}) => {
  const [ loginError, setLoginError ] = useState('')
  const [ loginSuccess, setLoginSuccess ] = useState(false)
  const [ isRegister, setIsRegister] = useState(false)

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;

    const loginInfo = {
      email: form.email.value,
      password: form.password.value
    }

    axios.post(`${API_URL}/users/login`, loginInfo)
      .then((response) => {
        sessionStorage.setItem('authToken', response.data.token);
        setLoginSuccess(true);
        hide()
        setIsLoggedIn(true)
      })
      .catch(err => {
        setLoginError(err.response.data)
      })
  }

  return (
    (isShowing ?
      (isRegister ?
        <div className="login">
        <div className="login__modal-overlay"/>
        <div className="login__modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="login__modal">
            <div className="login__modal-header">
              <button type="button" className="login__close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className='login__form' onSubmit={handleSubmit}>
              <label className="login__label" htmlFor="email">E-mail</label>
              <input className="login__input" type="email" name='email'/>
              <label className="login__label" htmlFor="email">Name</label>
              <input className="login__input" type="email" name='email'/>
              <label className="login__label" htmlFor="password">Password</label>
              <input className="login__input" type="password" name='password'/>
              <button className="login__button">Log in</button>
              
              {/* Error message */}
              {loginError && (
                <p>Incorrect Email and Password</p>
              )}
            </form>
            <p>Need an account? <span onClick={() => {setIsRegister(false)}}>Login here</span></p>
          </div>
        </div>
        </div> 
        : 

        <div className="login">
        <div className="login__modal-overlay"/>
        <div className="login__modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="login__modal">
            <div className="login__modal-header">
              <button type="button" className="login__close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form className='login__form' onSubmit={handleSubmit}>
              <label className="login__label" htmlFor="email">E-mail</label>
              <input className="login__input" type="email" name='email'/>
              <label className="login__label" htmlFor="password">Password</label>
              <input className="login__input" type="password" name='password'/>
              <button className="login__button">Log in</button>
              
              {/* Error message */}
              {loginError && (
                <p>Incorrect Email and Password</p>
              )}
            </form>
            <p>Need an account? <span onClick={() => {setIsRegister(true)}}>Register here</span></p>
          </div>
        </div>
        </div>) : null)
   )}


export default LoginModal;
