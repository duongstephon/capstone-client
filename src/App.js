import './App.scss';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import { useState } from 'react'

function App() {
  const [ isLoggedIn, setIsLoggedIn] = useState(false)
  const [ currentUser, setCurrentUser ] = useState(null)

  return (
    <div>
    <Header 
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}/>
    <MainPage 
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}/>
    </div>
  );
}

export default App;
