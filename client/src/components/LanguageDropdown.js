import React from 'react';
export default function LanguageDropdown({ dropdownLabel, dropdownLinks }) {
    return (
        <ul className="nav__dropdown">
            <li>{dropdownLabel}
                <ul className="dropdown-area">
                    {dropdownLinks.map((link) => <li key={link}>{link}</li>)}
                </ul>
            </li>
        </ul>
    );
}