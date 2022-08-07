import React, { useState,useEffect } from 'react';
import './SinglePost.scss';
import Likes from '../../assets/images/icon-like.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const SinglePost = ({id, userId, categoryId, title, text, likes, date, isLoggedIn, currentUser}) => {
  const [ postedUser, setPostedUser ] = useState(null);

  useEffect(() => {
    if (!postedUser) {
      axios
        .get(`${API_URL}/posts/${id}/user`)
          .then((response) => {
            setPostedUser(response.data[0])
          })
    }
  }, [postedUser])

  return (
    <div className='post'>
    <Link to={`/categories/${categoryId}/posts/${id}`} className='post__link'>
      <div className='post__post-content'>
        <p className='post__user'>{postedUser ? `Posted by ${postedUser.username}` : 'Loading...'}</p>
        <h4 className='post__title'>{title}</h4>
        <p>{text}</p>
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
