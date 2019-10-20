import React from 'react';
export default function LanguageDropdown({ dropdownLabel, dropdownLinks }) {
    return (
        <ul>
            <li>{dropdownLabel}
                <ul>
                    {dropdownLinks.map((link) => <li key={link}>{link}</li>)}
                </ul>
            </li>
        </ul>
    );
}