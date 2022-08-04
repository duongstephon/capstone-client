import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MainPage.scss'
import SinglePost from '../../components/SinglePost/SinglePost';

const API_URL = process.env.REACT_APP_API_URL;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const MainPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }) => {
  const [ posts, setPosts ] = useState([]);
  const [ isBackground, setIsBackground ] = useState(false)

  const handleShuffle = (array) => {
    let currIndex = array.length, randomIndex;
    while (currIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currIndex);
      currIndex--;

      [array[currIndex], array[randomIndex]] = [array[randomIndex], array[currIndex]]
    }
    return array
  }

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

  useEffect(() => {
    // if (!isBackground) {
    //   axios
    //     .get(`${UNSPLASH_KEY}`)
    // }
    if (posts) {
      axios
        .get(`${API_URL}/posts`)
        .then((response) => {
          setPosts(handleShuffle(response.data))
        })
      }
  }, []);

  return (
    <div className='main'>
        {posts.map((post) => {
          return (
          <SinglePost 
            title={post.title} 
            text={post.text} 
            likes={post.likes} 
            date={handleDate(post.date)}/>
          )
        })}
    </div>
  );
};

export default MainPage;
