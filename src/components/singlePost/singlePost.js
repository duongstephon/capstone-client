import React from 'react';
import './SinglePost.scss';
import Likes from '../../assets/images/icon-like.svg';

const SinglePost = ({title, text, likes, date}) => {

  return (
    <div className='post'>
      <h4>{title}</h4>
      <div>
        <p>{text}</p>
      </div>
      <div className='post__likes'>
        <img src={Likes} alt='likes' />
        <p>{likes}</p>
      </div>
      <p>{date}</p>
    </div>
  );
};

export default SinglePost;
