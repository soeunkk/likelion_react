import React from 'react';
import About from './About';
import Home from './Home';
import Profile from './Profile';
import Profiles from './Profiles';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <>
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/about">소개</Link>
      </li>
      <li>
        <Link to="/profiles">프로필 목록</Link>
      </li>
    </ul>
    <hr />
    <Routes>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/About" element={<About></About>}></Route>
    <Route path="/profiles/:username" element={<Profile></Profile>}></Route>
    <Route path="/profiles" element={<Profiles></Profiles>}></Route>
    </Routes>
    </>
  );
}

export default App;
