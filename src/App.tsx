import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MangaHome from './MangaHome';
import ChapterView from './ChapterView';
import PageView from './PageView';
import Favorite from './Favorite';
import LoginRegist from './loginRegist';
import Continues from './Continue';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  const handleSearch = () => {
    navigate(`/MangaHome?search=${encodeURIComponent(searchQuery)}`);
  }

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  }

  return (
    <div id="container">
      <div className='inner-wrapper'>
        <div className="logo">
          <h1>Manga Horizons</h1>
        </div>
        <div className="content">
          <div className="left-section">
            <input 
            type='text' 
            placeholder='Search Manga'
            className='search-bar'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn" onClick={handleSearch}>Search</button>
            <button className="btn" onClick={() => navigate('/MangaHome')}>Manga Home</button>
          </div>
          <div className="right-section">
            <button className="btn" onClick={() => setShowRegister(true)}>Register</button>
            <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
          </div>
        </div>
      </div>
      <LoginRegist 
        showLogin={showLogin} 
        showRegister={showRegister} 
        handleClose={handleClose}
      />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/MangaHome" element={<MangaHome />} />
      <Route path="/ChapterView/manga/:id" element={<ChapterView />} />
      <Route path='/PageView/chapter/:id' element={<PageView />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/continue' element={<Continues />} />
    </Routes>
  );
};

export default App;