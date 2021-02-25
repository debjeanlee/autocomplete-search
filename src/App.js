import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Search from './pages/Search'
import Axios from 'axios'

function App() {
 
  return (
    <div className="main-div">
        <h1>
          Autocomplete
         <FontAwesomeIcon icon={faGithub} className="github__icon" />
          Search
          </h1>
      <Search />
    </div>
  );
}

export default App;
