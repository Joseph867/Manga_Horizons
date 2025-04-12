import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Continue } from "./continueInterface";
import './Continue.css';

const Continues: React.FC = () => {
    const [progress, setProgress] = useState<Continue[]>([]);
    const navigate = useNavigate();
    const apiUrl = "http://localhost:3000";
    const userId = localStorage.getItem('userId') || '';

    useEffect(() => {
        async function fetchProgress() {
            if (!userId) return;
            try {
                const response = await fetch(`${apiUrl}/progress/${userId}`)
                const data = await response.json()
                setProgress(data)
            }catch (error) {
                console.error('Error fetching progress: ', error)
            }
        }
        fetchProgress()
    }, [userId])
    
    if (!userId) {
        return <p>Please log in to view your progress.</p>
    }

    return (
        <div className="progress-container">
            <h1>Your Reading Progress</h1>
            <div className="progress-list">
                {progress.map((item) => (
                    <div 
                    key={item.chapter.id}
                    className="progressItem"
                    onClick={() => navigate(`/PageView/chapter/${item.chapter.id}`)}
                    >
                        <h2>{item.manga.title}</h2>
                        <p>Last read chapter: {item.chapter.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Continues