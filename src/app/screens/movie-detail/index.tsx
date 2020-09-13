import React from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.css'
import { fetchMovie, getMovie, Movie } from '../../reducers/ducks/movie';
import GenresActions from '../../components/genres-actions';
import StylizedCircle from '../../components/stylized-circle';
import config from '../../config';

interface IMovieDetail {
    fetchMovie: (movieId: string) => Promise<void>;
    movie: Movie;
}

class MovieDetail extends React.Component<RouteComponentProps & IMovieDetail, any> {


    componentDidMount() {
        
        this.fetchMovie()
    }

    fetchMovie = async () => {
        const {movieId} = this.props.match.params as any;
        this.props.fetchMovie(movieId);
    }

    render() {
        const {movie = {} as Movie} = this.props;
        const { videos = [] } = movie;
        
        return(
            <div className="container">
                <div className="container-margin">
                    <div className="detail-container">
                    <div className="detail-header">
                        <h1>{movie.title}</h1>
                        <span>{movie.release_date}</span>
                    </div>
                    <div className="detail-content">
                        <div className="detail-letters">
                            <div>
                                <h3>Snopse</h3>
                                <hr/>
                                <p className="overview">{movie.overview}</p>
                            </div>
                            <div>
                                <h3>Informações</h3>
                                <hr/>
                                <div className="details">
                                    <span>
                                        <h3>Situação</h3>
                                        <span>{movie.status}</span>
                                    </span>
                                    <span>
                                        <h3>Idioma</h3>
                                        <span>{movie.original_language}</span>
                                    </span>
                                    <span>
                                        <h3>Duração</h3>
                                        <span>{movie.runtimeInHours}</span>
                                    </span>
                                    <span>
                                        <h3>Orçamento</h3>
                                        <span>${movie.budget}</span>
                                    </span>
                                    <span>
                                        <h3>Receita</h3>
                                        <span>${movie.revenue}</span>
                                    </span>
                                    <span>
                                        <h3>Lucro</h3>
                                        <span>${movie.profit}</span>
                                    </span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    height: 140
                                    }}>
                                    <div>
                                        <GenresActions genres={movie?.genres}/>
                                    </div>
                                    <div style={{alignSelf: "flex-end"}}>
                                        <StylizedCircle data={`${movie.vote_average}%`} size={100}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="detail-poster">
                            <img src={config.IMAGES_URL + movie.poster_path} alt=""/>
                        </div>
                    </div>
                </div>
                    <div style={{
                    display: 'flex', 
                    flexDirection: 'column',
                    maxWidth: 1024,
                    margin: "0 auto"
                }}>
                        {
                            videos.map((v: any, i:number) => (
                                <iframe
                                key={i}
                                style={{marginTop: 24}}
                                title={v?.name}
                                height={400}
                                src={"https://www.youtube.com/embed/" + v?.key}>
                                </iframe>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => ({
    ...getMovie(state)
}), (dispatch: any) => ({
    fetchMovie: (movieId: string) => dispatch(fetchMovie(movieId)),
}))(MovieDetail);