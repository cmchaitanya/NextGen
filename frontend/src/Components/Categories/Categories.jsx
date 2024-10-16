import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
    const categories = ['Bikes', 'Scooty', 'Cycle', 'Cooler', 'Electronics', 'Other'];
    const navigate = useNavigate();

    return (
        <div className="categories-container">
            <div className="categories-list">
                <span className="category-item all-categories" onClick={() => navigate('/')}>
                    All Categories
                </span>
                {categories.map((item, index) => (
                    <span
                        key={index}
                        className="category-item"
                        onClick={() => navigate('/category/' + item)}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Categories;
