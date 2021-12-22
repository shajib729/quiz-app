import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/pages/Home';
import Signup from './Components/pages/Signup';
import Login from './Components/pages/Login';
import './styles/App.css'
import Quiz from './Components/pages/Quiz';
import Result from './Components/pages/Result';
import {useAuth} from './context/AuthContext'
import { Error } from './Components/Error';

function App() {
  const { currentUser } = useAuth()
  return (
    <BrowserRouter>
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={currentUser? <Navigate to="/"/>:<Signup />}/>
          <Route path="/login" element={currentUser? <Navigate to="/"/>:<Login />}/>
          <Route path="/quiz/:id" element={!currentUser? <Navigate to="/login"/>:<Quiz />}/>
          <Route path="/result/:id" element={!currentUser? <Navigate to="/login"/>:<Result />}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Layout>
      </div>
      </BrowserRouter>
  );
}

export default App;
