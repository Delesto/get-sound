import React from 'react';
import Nav from './Nav';
import LanguageDropdown from './LanguageDropdown';

export default function Header({ navLinks, dropdownLabel, dropdownLinks }) {
    return (
        <header className="header">
            <div className="container">
                <a href="#" className="logo">GetSound.</a>
                <div className="nav">
                    <Nav navLinks={navLinks}/>
                    <LanguageDropdown dropdownLabel={dropdownLabel} dropdownLinks={dropdownLinks}/>
                </div>
            </div>
        </header>
    );
}