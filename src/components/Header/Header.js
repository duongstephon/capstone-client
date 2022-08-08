import React from 'react';
import './Header.scss';
import { useState, useEffect } from 'react'
import LoginModal from '../LoginModal/LoginModal';
import axios from 'axios'
import { Link } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;

const Header = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, history }) => {
  const [isShowing, setIsShowing] = useState(false)

  const toggleModal = () => {
    setIsShowing(!isShowing)
  }

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken')
    if (!authToken) {
      setIsLoggedIn(false)
    } else if (!isLoggedIn) {
      axios
        .get(`${API_URL}/users/current`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then((res) => {
          setIsLoggedIn(true)
          setCurrentUser(res.data)
        })
        .catch(err => {
          setIsLoggedIn(false)
        });
    }
  }
  );

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('authToken')
  }

  if (!isLoggedIn) {
    return (
      <div className='header'>
        <Link to='/'><h2 className='header__logo'>Read.ME</h2></Link>
        <form className='header__form'>
          <input className='header__search-bar' placeholder='Search' />
        </form>
        <div className='header__buttons-section'>
          <button className='header__button' onClick={toggleModal}>Login</button>
          <button className='header__button'>Go To Stories</button>
        </div>
        <LoginModal isShowing={isShowing} hide={toggleModal} setIsLoggedIn={setIsLoggedIn} />
      </div>
    );
  } else {
    return (
      <div className='header'>
        <Link to='/'><h2 className='header__logo'>Read.ME</h2></Link>
        <form className='header__form'>
          <input className='header__search-bar' placeholder='Search' />
        </form>
        <div className="header__info" >
          <p className='header__username'>{currentUser ? currentUser.username : 'Loading...'}</p>
          <div className='header__logged-in'>
            <button onClick={handleLogout} className='header__button'>Log Out</button>
            <button className='header__button'>Go To Stories</button>
          </div>
        </div>

      </div>
    )
  };
}

export default Header;
