import React, { useState, useEffect } from 'react';
import './Comment.scss';
import Likes from '../../assets/images/icon-like.svg';
import Delete from '../../assets/images/close-24px.svg';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Comment = ({ id, userId, text, likes, handleDate, date, isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, setComments, match }) => {
  const [ commentUser, setCommentUser ] = useState(null);

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
    if (!commentUser) {
      axios
        .get(`${API_URL}/comments/${id}/user`)
          .then((response) => {
            setCommentUser(response.data[0])
          })
    }
  }, [commentUser])

  const handleDelete = () => {
    if (isLoggedIn && currentUser.id === userId) {
      axios
        .delete(`${API_URL}/comments/${id}`)
          .then(() => {
              axios
              .get(`${API_URL}/posts/${match.params.postId}/comments`)
                .then((response) => {
                  setComments(response.data);
                })
          })
    }
  }

  return (
    <div className='comment'>
      <div className='comment__info'>
        <div className='comment__user-delete'>
          <p className='comment__user'>{commentUser ? commentUser.username : 'Loading...'}</p>
          <img className='post__delete' src={Delete} alt='delete' onClick={handleDelete}/>
        </div>
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
