import React, { useState, useEffect } from 'react';
import './CategoryPage.scss';
import axios from 'axios';
import SinglePost from '../../components/SinglePost/SinglePost';

const API_URL = process.env.REACT_APP_API_URL;
const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const CategoryPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, handleDate, match }) => {
  const [category, setCategory] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isBackground, setIsBackground] = useState(false);


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
      const categoryId = match.params.categoryid
      if (isNewCategory !== categoryId) {
        axios
        .get(`${API_URL}/categories/${categoryId}`)
          .then((response) => {
            setCategory(response.data);

            axios
              .get(`${API_URL}/categories/${categoryId}/posts`)
                .then((response) => {
                  setPosts(response.data);
                })
            })
          .catch(err => {console.log(err)})
      }
  }, [isNewCategory]);

  console.log(match)
  console.log(category)

  return (
    <div className='main'>
      <h1>{category ? category.name : 'Loading...'}</h1>
      {posts.map((post) => {
        return (
          <SinglePost
          title={post.title}
          text={post.text}
          likes={post.likes}
          date={handleDate(post.date)} />
        )
      })}
    </div>
  );
};

export default CategoryPage;
