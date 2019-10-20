import React from 'react';
import Nav from './Nav';
import LanguageDropdown from './LanguageDropdown';

export default function Header({ navLinks, dropdownLabel, dropdownLinks }) {
    return (
        <header>
            <h1>
                <a href="#">GetSound</a>
            </h1>
            <Nav navLinks={navLinks}/>
            <LanguageDropdown dropdownLabel={dropdownLabel} dropdownLinks={dropdownLinks}/>
        </header>
    );
}