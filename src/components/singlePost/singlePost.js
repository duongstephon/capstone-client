import React, { useState,useEffect } from 'react';
import './SinglePost.scss';
import Likes from '../../assets/images/icon-like.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const SinglePost = ({id, userId, title, text, likes, date, isLoggedIn, currentUser}) => {
  const [ postedUser, setPostedUser ] = useState(null);

  useEffect(() => {
    if (!postedUser) {
      axios
        .get(`${API_URL}/users`)
          .then((response) => {
            setPostedUser(response.data.filter((user) => user.id === userId)[0])
          })
    }
  }, [postedUser])

  return (
    <div className='post'>
    <Link className='post__link'>
      <div className='post__post-content'>
        <p>{postedUser ? `Posted by ${postedUser.username}` : 'Loading...'}</p>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </Link>
    <div className='post__likes-date'>
      <div className='post__likes'>
        <img src={Likes} alt='likes' />
        <p>{likes}</p>
      </div>
        <p>{date}</p>
    </div>
    </div>
  );
};

export default SinglePost;
