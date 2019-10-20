import React from 'react';
export default function Search({ submitButton }) {
    return (
        <form>
            <input type="text"/>
            <button type="submit">{submitButton}</button>
        </form>
    );
}