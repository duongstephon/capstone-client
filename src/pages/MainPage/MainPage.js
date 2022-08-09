import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MainPage.scss'
import SinglePost from '../../components/SinglePost/SinglePost';

const API_URL = process.env.REACT_APP_API_URL;
const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const MainPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, handleDate, history, match }) => {
  const [ posts, setPosts ] = useState([]);
  const [ isBackground, setIsBackground ] = useState(null)

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

  useEffect(() => {
    if (posts) {
      axios
        .get(`${API_URL}/posts`)
        .then((response) => {
          setPosts(handleShuffle(response.data))

          axios
          .get(`${UNSPLASH_API_URL}/photos/random/?orientation=landscape&client_id=${UNSPLASH_KEY}`)
            .then(background => {
              setIsBackground(background.data)
            })
        })
      }
    }, []);

  return (
    <div className='main' style={isBackground ? {backgroundImage: "url(" + isBackground.urls.raw + ")"} : {background: 'white'}}>
      <div>
        {posts.map((post) => {
          return (
          <SinglePost 
            key={post.id}
            id={post.id}
            userId={post.user_id}
            categoryId={post.category_id}
            title={post.title}
            text={post.text}
            likes={post.likes}
            date={handleDate(post.date)} 
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setAllPosts={setPosts}
            match={match}/>
          )
        })}  
      </div>
    </div>
  );
};

export default MainPage;
