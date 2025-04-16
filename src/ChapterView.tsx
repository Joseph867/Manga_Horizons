import 'bootstrap/dist/css/bootstrap.min.css';
import './ChapterView.css';
import React, { useEffect, useState } from 'react';
import LoginRegist from './loginRegist';
import { useNavigate, useParams } from "react-router-dom";
import { Chapter } from './chapterInterface'

const ChapterView: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profilename, setProfilename] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [chapters, setChapter] = useState<Chapter[]>([]);
  const userId = localStorage.getItem('userId') || '';
  const [searchQuery, setSearchQuery] = useState('');
  

  const apiUrl = "http://localhost:3000";

  useEffect(() => {
      const params = new URLSearchParams(location.search);
      const query = params.get('search') || ''
      setSearchQuery(query)
    } , [location.search])

  const handleChapterClick = async (chapterId: number, mangaId: number) => {
    if (userId) {
      try{
        await fetch(`${apiUrl}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: Number(userId),
            mangaId,
            chapterId,
          })
        })
      } catch (error) {
        console.error('hiba a chapter progress mentésekor: ', error)
      }
    }

    navigate(`/PageView/chapter/${chapterId}`);
  }

  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await fetch(`${apiUrl}/chapter/manga/${id}`);
        const data = await response.json();
        setChapter(data);
      } catch (error) {
        console.error('hiba a chapter betöltésekor: ', error)
      }
    }

    fetchChapters();
  }, [id]);



  useEffect(() => {
    if (localStorage.getItem('token')) {
      setShowLogout(true);
      setProfilename(localStorage.getItem('profilname') || '');
    } else {
      setShowLogout(false);
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
    setProfilename(localStorage.getItem('profilename') || '');
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profilname');
    setShowLogout(false);
    setProfilename('');
  };

  return (
    <>
      <div>
        <div className="container" id='contbar'>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#" onClick={() => navigate('/MangaHome')}>MANGA HORIZONS</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <ul className="nav-links">
                    <li><a href="" onClick={() => navigate('/favorite')}>Favorites</a></li>
                    <li><a href="" onClick={() => navigate('/continue')}>Continue your manga</a></li>
                  </ul>
                </div>
              </div>
              <form className="d-flex" role='search' onSubmit={(e) => e.preventDefault()}>
                <input
                 className='form-control me-2'
                  type="search" placeholder='Search' 
                  aria-label='Search'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
              </form>
              <div id='registrationButtons'>
                {showLogout == false ? <></> : <p className='profilename'>{localStorage.getItem('profilename')}</p>}
                {showLogout == false ? <button id='loginButton' className='btn btn-outline-success' onClick={handleLoginClick}>Login</button>
                  : <button id='logoutButton' className='btn btn-outline-danger' type='submit' onClick={handleLogout}>Logout</button>}
                {showLogout == false ? <button id='signUpButton' className='btn btn-outline-primary' onClick={handleRegisterClick}>Sign Up</button>
                  : <></>}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className='chapterView'>
        <h1 className='chapterTitle'>Chapter Title</h1>
        <h3 className='mangaAuthor'></h3>
        <div className='chapterContent'>
          {chapters.map((chapter) => (
            <div 
            key={chapter.id} 
            className='chapterItem' 
            onClick={() => handleChapterClick(chapter.id, Number(id))}>
              <img 
              src={`${apiUrl}/${chapter.filepath}`} 
              alt={chapter.name} 
              className='chapterImage' />
              <h2 className='chapterItemTitle'>{chapter.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <LoginRegist 
        showLogin={showLogin} 
        showRegister={showRegister} 
        handleClose={handleClose} 
      />
    </>
  )
}

export default ChapterView;