import React from 'react';

export default function InfoCard({ title, description }) {
    return (
        <div className="card">
            <h2 className="card__title">{title}</h2>
            <p className="card__description">{description}</p>
        </div>
    );
}