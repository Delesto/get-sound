import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Data
import languages from './data/languages';

ReactDOM.render(<App languages={languages} defaultLanguage={languages.russian}/>
    , document.getElementById('root'));
