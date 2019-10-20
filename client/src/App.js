import React from 'react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import InfoCard from './components/InfoCard.js';
import { useState } from 'react';

function App({ languages }) {
	const [ language, setLanguage ] = useState(languages.russian);

	return (
		<div>
			<Header navLinks={language.navLinks.slice(0, -1)}
					dropdownLabel={language.navLinks.slice(-1)}
					dropdownLinks={language.dropdownLinks}
					setLanguage={setLanguage}
			/>
			<main>
				<Search submitButton={language.submitButton}/>
				<div className="info-cards">
					{language.cards.map((card) => <InfoCard key={card.title} title={card.title} description={card.description}/>)}
				</div>
			</main>
		</div>
	);
}

export default App;