import React, { useState, useEffect } from 'react';
import './CategoryPage.scss';
import axios from 'axios';
import SinglePost from '../../components/SinglePost/SinglePost';
import { Link } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;
const UNSPLASH_API_URL = process.env.REACT_APP_UNSPLASH_API_URL;
const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const CategoryPage = ({ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, handleDate, match }) => {
  const [category, setCategory] = useState(null);
  const [isNewCategoryId, setIsNewCategoryId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isBackground, setIsBackground] = useState(null);


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
            setCategory(response.data);
            
            axios
              .get(`${API_URL}/categories/${categoryId}/posts`)
                .then((posts) => {
                  setPosts(posts.data);

                axios
                  .get(`${UNSPLASH_API_URL}/search/photos?orientation=landscape&query=${response.data.name}&client_id=${UNSPLASH_KEY}`)
                    .then(background => {
                      setIsBackground(background.data.results[0])
                    })
                })
            })
          .catch(err => {console.log(err)})
      }
  }, [isNewCategoryId]);

  console.log(isBackground)

  return (
    <div className='category' style={isBackground ? {backgroundImage: "url(" + isBackground.urls.raw + ")"} : {background: 'white'}}>
      <div className='category__title-section'>
        <div className='category__title-and-button'>
          <h1>{category ? category.name : 'Loading...'}</h1>
          <Link to={`/categories/${isNewCategoryId}/createpost`}><button className='category__button'>Add Post</button></Link>
        </div>
        <h3 className='category__description'>{category ? category.description : 'Loading...'}</h3>
      </div>
      {posts.map((post) => {
        return (
          <SinglePost
          key={post.id}
          id={post.id}
          userId={post.user_id}
          categoryId={post.category_id}
          title={post.title}
          text={post.text}
          likes={post.likes}
          date={handleDate(post.date)} 
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
          setAllPosts={setPosts}
          match={match}/>
        )
      })}
    </div>
  );
};

export default CategoryPage;
