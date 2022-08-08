import React, { useState, useEffect } from 'react';
import './PostPage.scss';
import axios from 'axios';
import Likes from '../../assets/images/icon-like.svg';
import Comment from '../../components/Comment/Comment';

const API_URL = process.env.REACT_APP_API_URL;

const PostPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, handleDate, match }) => {
  const [ comments, setComments ] = useState(null);
  const [ currentPost, setCurrentPost ] = useState(null);
  const [ isNewPostId, setIsNewPostId ] = useState(null);
  const [ postedUser, setPostedUser ] = useState(null);
  const [ newComment, setNewComment ] = useState('');

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
    const postId = match.params.postId
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
        })
        .catch(err => {
          setIsNewPostId(null)
        })
    }
  })

  useEffect(() => {
    const postId = match.params.postId
    if (!postedUser) {
      axios
        .get(`${API_URL}/posts/${postId}/user`)
          .then((response) => {
            setPostedUser(response.data[0])
          })
    }
  }, [postedUser])

  const handleChange = (event) => {
    setNewComment(event.target.value);
  }

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const postId = match.params.postId 
    if (isLoggedIn && newComment) {
      axios
        .post(`${API_URL}/posts/${postId}/comments`, {
          text: newComment,
          date: Date.now(),
          likes: 0,
          post_id: postId,
          user_id: currentUser.id
        })
        .then((response) => {
          setComments(response.data)
        })
    } else {
      alert('Please login to make comment')
    }
    setNewComment('');
  }

  return (
    <div className='post-page'>
        <p className='post-page__user'>{postedUser ? `Posted by ${postedUser.username}` : 'Loading...'}</p>
        <h2>{currentPost ? currentPost.title : 'Loading...'}</h2>
        <p className='post-page__text'>{currentPost ? currentPost.text : 'Loading...'}</p>
        <div className='post-page__likes-date'>
          <img className='post-page__likes-image' src={Likes} alt='likes' />
          <p className='post-page__likes-number'>{currentPost ? currentPost.likes : 'Loading...'}</p>
          <p className='post-page__date'>{currentPost ? handleDate(currentPost.date) : 'Loading...'}</p>
        </div>
        <section>
          <form className='post-page__comment' onSubmit={handleCommentSubmit}>
            <label className='post-page__login-label'>{currentUser ? `Comment as ${currentUser.username}` : `Login to comment` }</label>
            <textarea className='post-page__comment-input' type='text' name='comment' value={newComment} onChange={handleChange} placeholder='Add a comment...'/>
            <div className='post-page__tablet-button-format'>
              <button className='post-page__button'>Comment</button>
            </div>
          </form>
          <h4>{comments ? `${comments.length} Comments` : '0 Comments'}</h4>
          {comments?.map((comment) => {
            return (
              <Comment
              key={comment.id}
              id={comment.id}
              userId={comment.user_id}
              text={comment.text}
              likes={comment.likes}
              date={comment.date}
              handleDate={handleDate}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              match={match}
              setComments={setComments} />
            )
          })}
        </section>
    </div>
  );
};

export default PostPage;
