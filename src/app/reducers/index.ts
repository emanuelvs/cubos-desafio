import { combineReducers } from 'redux';
import { moviesReducer as movies } from './ducks/movies';
import { genresReducer as genres } from './ducks/genres';
import { movieReducer as movie} from './ducks/movie';

export default combineReducers({
    movies,
    genres,
    movie
})