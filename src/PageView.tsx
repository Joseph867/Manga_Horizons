import React from "react";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageView.css';
import { useParams } from "react-router-dom";
import { Page } from './pageInterface'


const PageView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [pages, setPages] = useState<Page[]>([]);
    const apiUrl = "http://localhost:3000";

    useEffect(() => {
        async function fetchPages() {
            try {
                const response = await fetch(`${apiUrl}/page/chapter/${id}`);
                const data = await response.json();
                setPages(data)
            } catch (error) {
                console.error('hiba a page betöltésekor: ', error)
            }
        }

        fetchPages();
    }, [id])


    return (
        <div className="page-view-container">
            {pages.map((page) => (
                <div key={page.id} className="page-item">
                    <img src={`${apiUrl}/${page.filepath}`} alt={`Page ${page.id}`} className="page-image" />
                </div>
            ))}
        </div>
    );
}

export default PageView;