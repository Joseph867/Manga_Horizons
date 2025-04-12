import React, { useEffect, useState } from "react";
import type { Favorite } from "./favoriteInterface";
import "./Favorite.css";

const Favorite: React.FC = () => {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const apiUrl = "http://localhost:3000";
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await fetch(`${apiUrl}/favorite/${userId}`);
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error('Error fetching favorites:', error);

            }
        }

        if (userId) {
            fetchFavorites();
        }
    }, [userId])

    if (!userId) {
        return <p>Please log in to view your favorites.</p>
    }

    return (
        <div className="favorites-container">
            <h1>Your Favorites</h1>
            <div className="favorites-list">
                {favorites.map((favorite: any) => (
                    <div key={favorite.manga.id} className="favorite-item">
                        <img
                            src={`${apiUrl}/${favorite.manga.cover?.filepath}`}
                            alt={favorite.manga.title}
                        />
                        <h3>{favorite.manga.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Favorite;