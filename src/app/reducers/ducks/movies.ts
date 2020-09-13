import reducerSelector from '../reducerSelector';
import config from '../../config';

export type Movie = {
    title: String,
    release_date: String,
    overview: String,
    status: String,
    genre_ids: Array<Number>,
    original_language: String,
    runtime: Number,
    budget: Number,
    revenue: Number,
    poster_path: String | null,
    vote_average: Number
}

export enum ActionsTypes {
    FETCH_MOVIES_START='get/movies/start',
    FETCH_MOVIES_SUCCESS='get/movies/success',
    FETCH_MOVIES_ERROR='get/movies/error',
    PAGE_HAS_CHANGED='edit/page',
}

type State = {
    page: number
    movies: Array<Movie>
    loading: Boolean
    error: Boolean
    max_content: number
}

export type Actions = {
    FETCH_MOVIES_START: {type: ActionsTypes.FETCH_MOVIES_START, payload: any},
    FETCH_MOVIES_SUCCESS: {type: ActionsTypes.FETCH_MOVIES_SUCCESS, payload: any},
    FETCH_MOVIES_ERROR: { type: ActionsTypes.FETCH_MOVIES_ERROR, payload: Error },
    PAGE_HAS_CHANGED: {type: ActionsTypes.PAGE_HAS_CHANGED, payload: number}
}


const initialState: State = {
    movies: [],
    loading: false,
    error: false,
    page: 1,
    max_content: 5
}


export const moviesReducer = reducerSelector(initialState, {
    [ActionsTypes.FETCH_MOVIES_START](state: State, a:Actions['FETCH_MOVIES_START']){
        var dto: State = {...state, loading: true};
        return dto
    },
    [ActionsTypes.FETCH_MOVIES_SUCCESS](state: State, a:Actions['FETCH_MOVIES_SUCCESS']){
        var dto: State = {...state, movies: a.payload, loading: false}
        return dto
    },
    [ActionsTypes.FETCH_MOVIES_ERROR](state: State, a:Actions['FETCH_MOVIES_ERROR']){
        var dto: State = {...state, error: true, loading: false}
        return dto
    },
    [ActionsTypes.PAGE_HAS_CHANGED](state: State, a:Actions['PAGE_HAS_CHANGED']) {
        var dto: State = {...state, page: a.payload}
        return dto
    }
})


const mainSelector = (cb: any) => {
    return (state: any) => cb(state.movies);
}

export const movies = mainSelector((state: State) => {
    const movies = state.movies;
    return {movies}
})

export const currentPage = mainSelector((state: State) => {
    const movies = state.movies;
    let lastMovieIndex =  state.page * state.max_content;
    let firstMovieIndex = lastMovieIndex - state.max_content;
    return {
        movies: (movies || []).slice(firstMovieIndex, lastMovieIndex) || [],
        page: state.page,
        totalPages: Math.ceil(movies.length / state.max_content)
  
    }
})


export const updateMovies = (movies: any[]) => ({type: ActionsTypes.FETCH_MOVIES_SUCCESS, payload: movies})
export const updatePage = (page: number) => ({type: ActionsTypes.PAGE_HAS_CHANGED, payload: page})

export const changePage = (page: number) => {
    return (dispatch: any) => dispatch(updatePage(page))
}

export function fetchMovies(method: string, query: any) {
    let q = ""
    if(query.length > 0 && method === "search"){
        q = "&query="+query
    }
    if(method === "discover") {
        q = "&with_genres="+query;
    }
    const searchUrl = `${config.API_URL}/${method}/movie?language=pt-BR${q}`
    return (dispatch: any) => {
        dispatch({type: ActionsTypes.FETCH_MOVIES_START, payload: true});
        return fetch(searchUrl, 
            { 
            method: "GET",
            headers: {
                Authorization: "Bearer " + config.API_SECRET,
                },
            mode: 'cors',
            cache: 'default' 
            }
        )
        .then(body => body.json())
        .then(res => {
            let movies: Movie[] = res.results;
            dispatch(updateMovies(movies))
        })
    }
}

export function popularMovies() {

    return (dispatch: any) => {

        const popularMoviesUrl = `${config.API_URL}/movie/popular?language=pt-BR`;
        return fetch(popularMoviesUrl, 
        { 
        method: "GET",
        headers: {
            Authorization: "Bearer " + config.API_SECRET,
            },
        mode: 'cors',
        cache: 'default' 
        })
        .then(body => body.json())
        .then(res => {
            let movies: Movie[] = res.results;
            dispatch({type: ActionsTypes.FETCH_MOVIES_SUCCESS, payload: movies})
        })
    }
}