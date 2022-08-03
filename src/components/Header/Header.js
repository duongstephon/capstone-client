import React from 'react';
import './Header.scss';
import { useState, useEffect } from 'react'
import LoginPage from '../../pages/LoginPage/LoginPage';

const Header = () => {
  const [ isShowing, setIsShowing ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  return (
    <div className='header'>
      <h2 className='header__logo'>Read.ME</h2>
      <form className='header__form'>
      <input className='header__search-bar' placeholder='Search'/>
      </form>
      <div className='header__buttons'>
        <button className='header__single-button' onClick={toggle}>Login</button>
        <button className='header__single-button'>Go To Stories</button>
      </div>
      <LoginPage isShowing={isShowing} hide={toggle} />
    </div>
  );
};

export default Header;
