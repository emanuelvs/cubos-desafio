import React from 'react';
import './style.css';

function Search({searchHandler}: any) {


    return (
        <>
            <input type="search" 
            name="search-movie" 
            className="search-input"
            onChange={searchHandler}
            placeholder="Busque um filme por nome, ano ou gênero..."
            />
        </>
    )
}

export default Search;
