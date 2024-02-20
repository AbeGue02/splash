import styles from './App.module.css';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Post from './components/Post';
import PostCreator from './components/PostCreator';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext()

function App() {

  const [user, setUser] = useState('')
  const [posts, setPosts] = useState([])

  const getUser = () => {
    fetch('http://localhost:3001/users/65cfd6197abd65f76176d1bc')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setUser(data)
      })
      .catch(e => console.error(e))
  }

  const getPosts = () => {
    fetch('http://localhost:3001/posts')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setPosts(data)
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    getUser() 
    getPosts()
  }, [])

  return (
    <UserContext.Provider value={user}>
      <div className={styles.container}>
        <Header />
        <PostCreator getPosts={getPosts} />
        {
          posts.map( (post) => (
            <Post props={post} getPosts={getPosts}/>
          ))
        }
      </div>
    </UserContext.Provider>
  );
}

export default App;
