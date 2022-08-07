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
        <p className='comment__user'>{commentUser ? commentUser.username : 'Loading...'}</p>
        <div className='comment__date-likes'>
          <div className='comment__likes'>
            <img className='comment__likes-image' src={Likes} alt='likes' />
            <p className='comment__likes-number'>{likes}</p>
          </div>        
          <p className='comment__date'>{handleDate(date)}</p>
        </div>
      </div>
      <p className='comment__text'>{text}</p>

    </div>
  );
};

export default Comment;
