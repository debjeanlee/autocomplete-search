import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Search from './components/pages/Search'

function App() {

  const [search, setSearch] = useState('');
  const [curSearch, setCurSearch] = useState('')
 
  return (
    <div className="main-div">
        <h1>
          Autocomplete
         <FontAwesomeIcon icon={faGithub} className="github__icon" />
          Search
          </h1>
      <Search search={search} setSearch={setSearch} curSearch={curSearch} setCurSearch={setCurSearch} />
    </div>
  );
}

export default App;
