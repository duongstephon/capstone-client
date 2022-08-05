import React from 'react';
import './Comment.scss';
import Likes from '../../assets/images/icon-like.svg' 

const Comment = ({ id, userId, postId, text, likes, handleDate, date, isLoggedIn, currentUser }) => {
  return (
    <div className='comment'>
      <div className='comment__info'>
        <p>name</p>
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
