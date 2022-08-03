import React, {useState} from 'react';
import axios from 'axios';
import './LoginModal.scss';

const API_URL = process.env.REACT_APP_API_URL;

const LoginModal = ({isShowing, hide}) => {
  const [ isError, setIsError ] = useState(false)
  const [ isRegister, setIsRegister] = useState(false)

  const handleLogin = (event) => {
    event.preventDefault();

    const form = event.target;

    const loginInfo = {
      email: form.email.value,
      password: form.password.value
    }

    axios.post(`${API_URL}/users/login`, loginInfo)
      .then((response) => {
        sessionStorage.setItem('authToken', response.data.token);
        setIsError(false);
        hide();
      })
      .catch(err => {
        setIsError(true);
      })
  }

  const handleRegister = (event) => {
    event.preventDefault();

    const form = event.target;

    const userInfo = {
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      email: form.email.value,
      username: form.username.value,
      password: form.password.value
    }

    axios
      .post(`${API_URL}/users/register`, userInfo)
        .then((res) => {
          setIsRegister(false);
          setIsError(false);
        })
        .catch(err => {
          setIsError(true);
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
            <form className='login__form' onSubmit={handleRegister} >
              <div>
                <div>
                  <label className="login__label" htmlFor="text">First Name</label>
                  <input className="login__input" type="text" name='first_name'/>
                </div>
                <div>
                  <label className="login__label" htmlFor="text">Last Name</label>
                  <input className="login__input" type="text" name='last_name'/>
              </div>
              </div>
              <label className="login__label" htmlFor="email">E-mail</label>
              <input className="login__input" type="email" name='email'/>
              <label className="login__label" htmlFor="text">Username</label>
              <input className="login__input" type="text" name='username'/>
              <label className="login__label" htmlFor="password">Password</label>
              <input className="login__input" type="password" name='password'/>
              <button className="login__button">Log in</button>
              
              {/* Error message */}
              {isError && (
                <p>Please fill in all fields correctly</p>
              )}
            </form>
            <p>Already have an account? <span onClick={() => {setIsRegister(false)}} className="link">Login here</span></p>
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
            <form className='login__form' onSubmit={handleLogin}>
              <label className="login__label" htmlFor="email">E-mail</label>
              <input className="login__input" type="email" name='email'/>
              <label className="login__label" htmlFor="password">Password</label>
              <input className="login__input" type="password" name='password'/>
              <button className="login__button">Log in</button>
              
              {/* Error message */}
              {isError && (
                <p>Incorrect Email and Password</p>
              )}
            </form>
            <p>Need an account? <span onClick={() => {setIsRegister(true)}} className="link">Register here</span></p>
          </div>
        </div>
        </div>) : null)
   )}


export default LoginModal;
