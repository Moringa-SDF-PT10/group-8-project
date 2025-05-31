import { useState } from 'react'
import './App.css'

//for temp testing api
import React from 'react';
// import './App.css'; // Assuming you have this for global styles
import DestinationSuggestions from './components/api_integration/DestinationSuggestions.jsx';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Trip Planner App (SPA)</h1>
            </header>
            <main>
                <DestinationSuggestions />
            </main>
        </div>
    );
}

export default App;
