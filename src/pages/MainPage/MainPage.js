import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MainPage.scss'

const API_URL = process.env.REACT_APP_API_URL;

const MainPage = () => {
  const [ posts, setPosts ] = useState([])
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ user, setUser ] = useState(null)

  const handleShuffle = (array) => {
    let currIndex = array.length, randomIndex;
    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--;

      [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]]
    }
    return array
  }

  // useEffect(() => {
  //   const authToken = sessionStorage.getItem('authToken');
  //   if (!authToken) {
  //     setIsLoggedIn(false)
  //   }

  //   axios
  //     .get(`${API_URL}/posts`)
  //     .then(response => {
  //       setPosts(handleShuffle(response.data))
  //     })
  // })

  return (
    <div>
        {posts.map(post => {
          <p>{post.id}</p>
        })}
    </div>
  );
};

export default MainPage;
