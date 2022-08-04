import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MainPage.scss'

const API_URL = process.env.REACT_APP_API_URL;

const MainPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }) => {
  const [ posts, setPosts ] = useState([]);

  const handleShuffle = (array) => {
    let currIndex = array.length, randomIndex;
    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--;

      [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]]
    }
    return array
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

  // useEffect(() => {
  //   if (!posts) {
  //     axios
  //     .get(`${API_URL}/posts`)
  //     .then(response => {
  //       setPosts(response.data)
  //     })
  //   }
  //   });

  console.log(posts)

  return (
    <div>
        {posts.map(post => {
          <p>hello</p>
        })}
    </div>
  );
};

export default MainPage;
