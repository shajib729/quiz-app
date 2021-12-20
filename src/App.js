import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Components/Layout';
import Home from './Components/pages/Home';
import Signup from './Components/pages/Signup';
import Login from './Components/pages/Login';
import './styles/App.css'
import Quiz from './Components/pages/Quiz';
import Result from './Components/pages/Result';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/quiz" element={<Quiz />}/>
          <Route path="/result" element={<Result />}/>
        </Routes>
      </Layout>
      </div>
      </BrowserRouter>
  );
}

export default App;
