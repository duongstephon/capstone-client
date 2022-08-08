import './App.scss';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import PostPage from './pages/PostPage/PostPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

function App() {
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ category, setCategory ] = useState('')
  // const [ isBackground, setIsBackground ] = useState(null);

  // useEffect(() => {
  //   if (!isBackground) {
  //     axios
  //       .get(`${UNSPLASH_API_URL}/photos/random/?client_id=${UNSPLASH_KEY}`)
  //         .then(response => {
  //           setIsBackground(response.data)
  //         })
  //   }
  // })
  // style={isBackground ? {backgroundImage: "url(" + isBackground.urls.raw + ")"} : {background: 'white'}}

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
        setCurrentUser={setCurrentUser}
        category={category}
        setCategory={setCategory}/>
      <Switch className='app'>
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
        <Route path='/categories/:categoryId' exact component={(routerProps) => {
          return (
            <CategoryPage
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            handleDate={handleDate}
            {...routerProps}/> 
          )
          }} />
        <Route path='/categories/:categoryId/posts/:postId' exact component={(routerProps) => {
            return (
              <PostPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              handleDate={handleDate}
              {...routerProps}/> 
            )
            }} /> 
        <Route path='/categories/:categoryId/createpost' exact component={(routerProps) => {
            return (
              <CreatePostPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              handleDate={handleDate}
              {...routerProps}/> 
            )
            }} /> 
      </Switch>
    </Router>
  );
}

export default App;
