import React, { useState, useEffect } from 'react';
import './SinglePost.scss';
import Likes from '../../assets/images/icon-like.svg';
import Delete from '../../assets/images/close-24px.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const SinglePost = ({id, userId, categoryId, title, text, likes, date, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, setAllPosts, match }) => {
  const [ postedUser, setPostedUser ] = useState(null);

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
    if (!postedUser) {
      axios
        .get(`${API_URL}/posts/${id}/user`)
          .then((response) => {
            setPostedUser(response.data[0])
          })
    }
  }, [postedUser])

  const handleDelete = () => {
    if (isLoggedIn && currentUser.id === userId) {
      axios
        .delete(`${API_URL}/posts/${id}`)
          .then(() => {
            if (match.params.categoryId) {
              axios
              .get(`${API_URL}/categories/${match.params.categoryId}/posts`)
                .then((response) => {
                  setAllPosts(response.data);
                })
            } else {
              axios
              .get(`${API_URL}/posts`)
                .then(response => {
                  setAllPosts(response.data)
                })
            }
          })
    }
  }

  return (
    <div className='post'>
    <img className='post__delete' src={Delete} alt='delete' onClick={handleDelete}/>
    <Link to={`/categories/${categoryId}/posts/${id}`} className='post__link'>
      <div className='post__post-content'>
        <p className='post__user'>{postedUser ? `Posted by ${postedUser.username}` : 'Loading...'}</p>
        <h4 className='post__title'>{title}</h4>
        <p className='post__text'>{text}</p>
      </div>
    </Link>
    <div className='post__likes-date'>
      <div className='post__likes'>
        <img className='post__likes-image'src={Likes} alt='likes' />
        <p className='post__likes-number'>{likes}</p>
      </div>
        <p>{date}</p>
    </div>
    </div>
  );
};

export default SinglePost;
