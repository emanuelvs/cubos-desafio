import React from 'react';
import './style.css';

const GenresActions = ({genres = []}: any) => {

    return(
        <div className="action-wrapper">
            {genres.map((genre:any, i: number) => 
                <div className="action" key={i}>
                    <span>{genre.name}</span>
                </div>
            )}    
        </div>
    )
}

export default GenresActions;