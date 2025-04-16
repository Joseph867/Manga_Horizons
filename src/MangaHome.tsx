import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MangaHome.css';
import LoginRegist from './loginRegist'; 
import { useNavigate } from "react-router-dom";
import { Manga } from './MangaInterface'
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
 
const MangaHome: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [profilename, setProfilename] = useState('');
  const [manga, setMangaList] = useState<Manga[]>([])
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || ''
    setSearchQuery(query)
  } , [location.search])

  const handleAddFavorite = async (mangaId: number) => {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
        alert('You must be logged in to add favorites.')
        return;
    }

    const mangaIndex = manga.findIndex((m) => m.id === mangaId)
    if (mangaIndex === -1) return;

    const isFavorite = manga[mangaIndex].isFavorite;

    try {
        const response = await fetch(`${apiUrl}/favorite`, {
            method: isFavorite ? 'DELETE' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, mangaId }),
        });

        if (response.ok) {
            setMangaList((prevManga) => 
                prevManga.map((m) => 
                m.id === mangaId ? { ...m, isFavorite: !isFavorite} : m
          )
        )
        } else {
            alert('Failed to add manga to favorites.')
        }
    } catch (error) {
        console.error('Error adding favorite:', error)
    }
} 

  useEffect(() => { 
    async function fetchManga() {
      try {
        const userId = localStorage.getItem('userId')
        const response = await fetch(`${apiUrl}/manga/all`)
        const data: Manga[] = await response.json()

        if (userId) {
          const favoritesResponse = await fetch(`${apiUrl}/favorite/${userId}`)
          const favoriteData = await favoritesResponse.json()

          const updatedManga = data.map((manga) => ({
            ...manga,
            isFavorite: favoriteData.some((fav: any) => fav.mangaId === manga.id)
          }))

          setMangaList(updatedManga)
        } else {
          setMangaList(data)
        }
      } catch (error) {
        console.error('Error fetching manga:', error)
      }
    }
    fetchManga()
  }, [])

  const filteredManga = manga.filter((manga) =>
    manga.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    localStorage.removeItem('userId');
    setShowLogout(false);
    setProfilename('');
  };

  return (
    <>
      <div>
        <div className="container" id='contbar'>
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">MANGA HORIZONS</a>
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
                type="search" 
                placeholder='Search' 
                aria-label='Search'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} />
              </form>
              <div id='registrationButtons'>
                {showLogout ==  false ? <></> : <p className='profilename'>{localStorage.getItem('profilename')}</p>}
              {showLogout == false ? <button id='loginButton' className='btn btn-outline-success' onClick={handleLoginClick}>Login</button>
                : <button id='logoutButton' className='btn btn-outline-danger' type='submit' onClick={handleLogout}>Logout</button>}
                {showLogout == false ? <button id='signUpButton' className='btn btn-outline-primary' onClick={handleRegisterClick}>Sign Up</button>
                : <></>}
              </div>
            </div>
          </nav>
        </div>
          <div className="container" id="page">
          <div className="row">
            {filteredManga.map((Manga) => (
              <div
                className="card"
                key={Manga.id}
                onClick={() => navigate(`/ChapterView/manga/${Manga.id}`)}
              >
                <div className="favorite-icon" onClick={(e) =>{
                  e.stopPropagation();
                  handleAddFavorite(Manga.id)
                  }}>
                  {Manga.isFavorite ? (
                    <FaHeart className='filled-heart'/>
                  ) : (
                    <FaRegHeart className='empty-heart'/>
                  )}
                </div>
                <img
                  className="background"
                  src={`${apiUrl}/${Manga.cover?.filepath}`}
                  alt={Manga.title}
                />
                <div className="card-content">
                  <h3 className="title">{Manga.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <LoginRegist 
        showLogin={showLogin} 
        showRegister={showRegister} 
        handleClose={handleClose} 
      />
    </>
  );
};

export default MangaHome;



