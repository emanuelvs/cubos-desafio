import React from 'react';
import MovieCard from '../../components/movie-card';
import Search from '../../components/search';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchMovies, Movie, popularMovies, currentPage, changePage } from '../../reducers/ducks/movies';
import { fetchGenres, Genre, genres, genresNormalized } from '../../reducers/ducks/genres';
import Pagination from '../../components/pagination';

interface IMovieList {
    fetchMovies: (method: string, query: any) => Promise<void>;
    popularMovies: () => Promise<void>;
    fetchGenres: () => Promise<void>;
    changePage: (page: number) => any;
    genresNormalized: {[key: string]: number};
    movies: Movie[];
    genres: Genre[];
    page: number;
    totalPages: number
}

class MovieList extends React.Component<RouteComponentProps & IMovieList> {

    state = {
        movies: [] as Movie[]
    }

    componentDidMount() {
        this.props.fetchGenres()
        this.props.popularMovies()
    }

    

    typingDelay: any
    handleSearchInput = (event: any) => {
        const {value} = event.target;
        if(String(value).length > 3){
            clearTimeout(this.typingDelay)
            this.typingDelay = setTimeout(() => {
                let normalized = (String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase()
                let genero = this.props?.genresNormalized[normalized] || null
                if(genero) {
                        this.props.fetchMovies("discover", genero);
                }else {
                    this.props.fetchMovies("search", value);
                }
            }, 150)
        }
        else if(String(value).length > 1){
            clearTimeout(this.typingDelay)
            this.typingDelay = setTimeout(() => {
                this.props.fetchMovies("search", value);
            }, 150)
        }else {
            this.props.popularMovies()
        }
        
    }

    handleChangePage = (page: number) => {
        window.scrollTo(0,0);
        this.props.changePage(page)
    }

    render() {
        const { 
            movies = [], 
            genres = [], 
            totalPages = 1, 
            page=1
        } = this.props;

        return(
            <div className="container">
                <div className="container-margin">
                    <Search searchHandler={this.handleSearchInput}/>
                    {
                        movies.map((movie: any, i) => (
                            <Link to={`/${movie.id}`} 
                            style={{textDecoration: 'none', color: 'inherit'}}
                            key={movie.id}>
                                <MovieCard movie={movie} genres={genres}/>
                            </Link>
                        ))
                    }
                    <Pagination totalPages={totalPages} currentPage={page} changePage={this.handleChangePage}/>
                    
                </div>
            </div>            
        );
    }
}

export default connect((state) => ({
    ...genres(state),
    ...currentPage(state),
    ...genresNormalized(state)
}),
    (dispatch: any) => ({
        fetchMovies: (method: string, query: any) => dispatch(fetchMovies(method, query)),
        popularMovies: () => dispatch(popularMovies()),
        fetchGenres: () => dispatch(fetchGenres()),
        changePage: (page: number) => dispatch(changePage(page))
    }))
(MovieList);