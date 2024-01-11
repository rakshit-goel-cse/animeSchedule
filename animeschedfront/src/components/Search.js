import React, { useState } from 'react';

function Search() {

    const [animename, setanimename] = useState('');

    const handleSearch = () =>{
        alert('anime search');
        let storedlist=sessionStorage.getItem('animelist');
        if(storedlist){
            let animelist=JSON.parse(storedlist);
            animelist=[...animelist,animename];
            sessionStorage.setItem('animelist',JSON.stringify(animelist));
        }
        return setanimename('');
    }

    return (
        <div className='body_home'>
        <div className='container'>
        
              <label>
                Anime name:
                <input
                  type="text"
                  placeholder='Case Sensitive'
                  value={animename}
                  onChange={(e) => setanimename(e.target.value)}
                />
              </label>
              <button onClick={handleSearch}>Search</button>
        </div>
        </div>
        );
}

export default Search;