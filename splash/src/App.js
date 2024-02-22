import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios'

import styles from './App.module.css';
import Header from './components/Header';
import Feed from './routes/Feed';
import Profile from './routes/Profile';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState('')

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/65cfd6197abd65f76176d1bc')
      setUser(response.data)
    } catch(e) {
      console.error("There was an error while getting user: ", e)
    }
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
            <Route path='/profile/:profileId' element={<Profile />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
