// import React from 'react';
// import './CategoryPage.scss'

// const CategoryPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [isBackground, setIsBackground] = useState(false)

//   useEffect(() => {
//     const authToken = sessionStorage.getItem('authToken')
//     if (!authToken) {
//       setIsLoggedIn(false)
//     } else if (!isLoggedIn) {
//       axios
//         .get(`${API_URL}/users/current`, {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         })
//         .then((res) => {
//           setIsLoggedIn(true)
//           setCurrentUser(res.data)
//         })
//         .catch(err => {
//           setIsLoggedIn(false)
//         });
//     }
//   }
//   );

//   useEffect(() => {
//     // if (!isBackground) {
//     //   axios
//     //     .get(`${UNSPLASH_KEY}`)
//     // }
//     if (posts) {
//       axios
//         .get(`${API_URL}/posts`)
//         .then((response) => {
//           setPosts(handleShuffle(response.data))
//         })
//     }
//   }, []);

//   return (
//     <div className='main'>
//       {posts.map((post) => {
//         return (
//           <SinglePost
//             title={post.title}
//             text={post.text}
//             likes={post.likes}
//             date={handleDate(post.date)} />
//         )
//       })}
//     </div>
//   );
// };

// export default CategoryPage;
