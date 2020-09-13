import React from 'react'
import './style.css'
import GenresActions from '../genres-actions';
import config from '../../config'

function MovieCard({movie = {}, genres = []}: any) {
    
    movie = {...movie, genres: genres.filter((genre: any) => movie.genre_ids.indexOf(genre.id) !== -1), release_date: (new Date(movie.release_date).toLocaleDateString())}
    return (
        <div className="movie-card">
            <div className="movie-card-img">
                <img src={config.IMAGES_URL + movie.poster_path} alt="Foto de capa do filme" className="movie-img"/>
            </div>
            <div className="movie-card-content">
                <div className="movie-card-header">
                    <div className="movie-rating-container">
                        <div className="movie-rating-wrapper">
                            <div className="rating-circle">
                                <span className="movie-rating-percent">
                                    {(movie.vote_average * 10) + "%"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <h2 className="movie-card-title">
                        {movie.title}
                    </h2>
                </div>
                <div className="movie-release-date">
                    <span>{movie.release_date}</span>
                </div>
                <div className="movie-description">
                    <p className="movie-description-letters">{movie.overview}</p>
                    <GenresActions genres={movie?.genres}/>
                </div>
            </div>
        </div>
    )
}



export default MovieCard;