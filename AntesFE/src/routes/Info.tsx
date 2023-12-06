import React, { useState } from 'react';
import '../info.css';

export default function Info() {
    // State variables for filters
    const [dateFilter, setDateFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');

    // Your data, you can replace this with your actual data
    const data = [
        { title: 'Antes Homepage', url: 'https://www.anteszorg.nl/', date: '2003-01-01' },
        { title: 'Antes Contact', url: 'https://www.anteszorg.nl/contact/', date: '2000-01-01' },
        { title: 'Werken bij antes', url: 'https://www.anteszorg.nl/werken-bij-antes/', date: '2022-01-01' },
        { title: 'Training', url: 'https://www.anteszorg.nl/cursus-training', date: '2022-01-01' },
        { title: 'Antes Homepage', url: 'https://www.anteszorg.nl/', date: '2023-01-01' },
        { title: 'Antes Homepage', url: 'https://www.anteszorg.nl/', date: '2023-01-01' },
        { title: 'Antes Homepage', url: 'https://www.anteszorg.nl/', date: '2023-01-01' },
        { title: 'Antes Homepage', url: 'https://www.anteszorg.nl/', date: '2023-01-01' },
        // Add other data items
    ];

    // Apply filters
    const filteredData = data.filter(item => 
        item.date.includes(dateFilter) && item.title.toLowerCase().includes(titleFilter.toLowerCase())
    );

    return (
        <div className='info_pagina'>
            <div className="titel">
                <h1>Protocollen en richtlijnen</h1>
            </div>

            {/* Filter inputs */}
            <div className="filters">
                <label htmlFor="dateFilter">Filter by Date:</label>
                <input 
                    type="text" 
                    id="dateFilter" 
                    value={dateFilter} 
                    onChange={(e) => setDateFilter(e.target.value)} 
                />
                <label htmlFor="titleFilter">Filter by Title:</label>
                <input 
                    type="text" 
                    id="titleFilter" 
                    value={titleFilter} 
                    onChange={(e) => setTitleFilter(e.target.value)} 
                />
            </div>

            <div className="info">
                <ul>
                    {filteredData.map((item, index) => (
                        <li key={index}>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                            <p>Date: {item.date}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
