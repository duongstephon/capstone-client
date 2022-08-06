import React, {useState, useEffect} from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const CreatePostPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, match, history }) => {
  const [ currentCategory, setCurrentCategory ] = useState(null);
  const [ isNewCategoryId, setIsNewCategoryId ] = useState(null);
  const [ title, setTitle] = useState('')
  const [ text, setText] = useState('')

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
      const categoryId = match.params.categoryId
      if (isNewCategoryId !== categoryId) {
        setIsNewCategoryId(categoryId);
        axios
        .get(`${API_URL}/categories/${categoryId}`)
          .then((response) => {
            setCurrentCategory(response.data);
            })
          .catch(err => {console.log(err)})
      }
  }, [isNewCategoryId]);

  const handleTitleChange = (event) => {
    event.preventDefault()
    setTitle(event.target.value)
  }

  const handleTextChange = (event) => {
    event.preventDefault()
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const categoryId = match.params.categoryId
    if (isLoggedIn && title) {
      axios
        .post(`${API_URL}/categories/${categoryId}/posts`, {
          title: title,
          text: text,
          date: Date.now(),
          likes: 0,
          category_id: categoryId,
          user_id: currentUser.id
        })
        .then((response) => {
          history.push(`/categories/${categoryId}`)
        })
    }
  }
  return (
    <div>
      <h1>{currentCategory ? `Create a Post for <${currentCategory.name}>` : 'Loading...'}</h1>
      <form onSubmit={handleSubmit}>
      <label>{currentUser ? `Post as ${currentUser.username}` : `Login to comment` }</label>
        <input type='text' name='title' value={title} onChange={handleTitleChange}  placeholder='Title'/>
        <textarea type='text' name='text' value={text} onChange={handleTextChange} placeholder='Text (optional)'/>
        <button>Post</button>
      </form>
    </div>
  );
};

export default CreatePostPage;
