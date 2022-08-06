import React, { useState, useEffect } from 'react';
import './Comment.scss';
import Likes from '../../assets/images/icon-like.svg';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Comment = ({ id, userId, text, likes, handleDate, date, isLoggedIn, currentUser }) => {
  const [ commentUser, setCommentUser ] = useState(null)

  useEffect(() => {
    if (!commentUser) {
      axios
        .get(`${API_URL}/comments/${id}/user`)
          .then((response) => {
            setCommentUser(response.data[0])
          })
    }
  }, [commentUser])

  return (
    <div className='comment'>
      <div className='comment__info'>
        <p>{commentUser ? commentUser.username : 'Loading...'}</p>
        <p>{handleDate(date)}</p>
        <div className='comment__likes'>
          <img src={Likes} alt='likes' />
          <p>{likes}</p>
        </div>
      </div>
      <p>{text}</p>

    </div>
  );
};

export default Comment;
