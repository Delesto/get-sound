import React from 'react';
export default function Nav({ navLinks }) {
    return (
        <ul className="nav__primary">
            {navLinks.map((link) => <li key={link}><a href={link}>{link}</a></li>)}
        </ul>
    );
}