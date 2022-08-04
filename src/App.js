import './App.scss';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(null);

  const handleDate = (timestamp) => {
    let date = new Date(timestamp)
    let day = date.getDate();
    if (day <= 9) {day = '0' + String(day)}
    let month = date.getMonth()+1;
    if (month <= 9) {month = '0' + String(month)}
    let year = date.getFullYear();
    let fullDate = `${month}/${day}/${year}`
    return fullDate
  }
  
  return (
    <Router>
      <Header 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}/>
      <Switch>
        <Route path='/' exact component={(routerProps) => {
          return (
            <MainPage 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            handleDate={handleDate}
            {...routerProps}/> 
          )
        }} />
        {/*
        <Route path='/categories/:categoryid' exact component={(routerProps) => {
          return (
            <CategoryPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            handleDate={handleDate}
            {...routerProps}/> 
          )
        }} />*/}   
      </Switch>
    </Router>
  );
}

export default App;
