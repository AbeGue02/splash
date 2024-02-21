import styles from './App.module.css';
import Header from './components/Header';
import Post from './components/Post';
import PostCreator from './components/PostCreator';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from './routes/Feed';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState('')

  const getUser = () => {
    fetch('http://localhost:3001/users/65cfd6197abd65f76176d1bc')
    .then((response) => response.json())
    .then((data) => {
        setUser(data)
    })
    .catch(e => console.error(e))
  }

  useEffect(() => {
    getUser() 
  }, [])

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className={styles.container}>
          <Header />
          <Routes>
            <Route path='/' element={<Feed/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
