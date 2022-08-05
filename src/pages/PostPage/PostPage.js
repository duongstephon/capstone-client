import React, { useState, useEffect } from 'react';
import './PostPage.scss';
import axios from 'axios';
import Likes from '../../assets/images/icon-like.svg';

const API_URL = process.env.REACT_APP_API_URL;

const PostPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, handleDate, match }) => {
  const [comments, setComments] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const [isNewPostId, setIsNewPostId] = useState(null);
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
    const postId = match.params.postid
    if (isNewPostId !== postId) {
      setIsNewPostId(postId)
      axios
      .get(`${API_URL}/posts/${postId}`)
        .then((response) => {
          setCurrentPost(response.data[0])

          axios
            .get(`${API_URL}/posts/${postId}/comments`)
              .then((response) => {
                setComments(response.data)
              })
          
          axios
          .get(`${API_URL}/users`)
            .then((response) => {
              if (currentPost) {
                setPostedUser(response.data.filter((user) => {return user.id === currentPost.user_id}))
              }
            })
        })
        .catch(err => {
          setIsNewPostId(null)
        })
    }
  })

  console.log(currentPost)
  console.log(comments)
  console.log(postedUser)

  return (
    <div className='post-page'>
        <p>{currentPost ? `Posted by ${currentPost.username}` : 'Loading...'}</p>
        <h2>{currentPost ? currentPost.title : 'Loading...'}</h2>
        <p>{currentPost ? currentPost.text : 'Loading...'}</p>
        <div className='post-page__likes-date'>
          <img src={Likes} alt='likes' />
          <p>{currentPost ? currentPost.likes : 'Loading...'}</p>
          <p className='post-page__date'>{currentPost ? handleDate(currentPost.date) : 'Loading...'}</p>
        </div>
    </div>
  );
};

export default PostPage;
