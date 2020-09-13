import reducerSelector from '../reducerSelector';
import config from '../../config';
import iso from '../../utils/iso';

export type Movie = {
    title: String,
    release_date: string,
    overview: String,
    status: string,
    genre_ids: Array<Number>,
    original_language: string,
    runtime: number,
    budget: number,
    revenue: number,
    poster_path: String | null,
    vote_average: number,
    genres?: {id: number, name: string},
    profit?: number,
    runtimeInHours?: string,
    videos?: {key: string, name: string}[]
}

type Status = {
    [key: string]: string
}

const movieStatus: Status = {
    'Rumored':'Rumores',
    'Planned':'Planejado',
    'In Production':'Em produção',
    'Post Production':'Pós-produção',
    'Released':'Lançado',
    'Canceled':'Cancelado'
}




export enum ActionsTypes {
    FETCH_MOVIE_START='get/movie/start',
    FETCH_MOVIE_SUCCESS='get/movie/success',
    FETCH_MOVIE_ERROR='get/movie/error'
}


type State = {
    movie: Movie
    loading: Boolean
    error: Boolean
}

export type Actions = {
    FETCH_MOVIE_START: {type: ActionsTypes.FETCH_MOVIE_START, payload: any},
    FETCH_MOVIE_SUCCESS: {type: ActionsTypes.FETCH_MOVIE_SUCCESS, payload: any},
    FETCH_MOVIE_ERROR: { type: ActionsTypes.FETCH_MOVIE_ERROR, payload: Error }
}


const initialState: State = {
    movie: {} as Movie,
    loading: false,
    error: false
}


export const movieReducer = reducerSelector(initialState, {
    [ActionsTypes.FETCH_MOVIE_START](state: State, a:Actions['FETCH_MOVIE_START']){
        var dto: State = {...state, loading: true};
        return dto
    },
    [ActionsTypes.FETCH_MOVIE_SUCCESS](state: State, a:Actions['FETCH_MOVIE_SUCCESS']){
        var dto: State = {...state, movie: a.payload, loading: false}
        return dto
    },
    [ActionsTypes.FETCH_MOVIE_ERROR](state: State, a:Actions['FETCH_MOVIE_ERROR']){
        var dto: State = {...state, error: true, loading: false}
        return dto
    }
})


const mainSelector = (cb: any) => {
    return (state: any) => cb(state.movie);
}

export const getMovie = mainSelector((state: State) => {
    const {movie} = state;
    let profit = Number(movie.revenue - movie.budget)
    let hours = Math.floor(movie.runtime / 60);
    let minutes = movie.runtime % 60;
    let language = iso[movie.original_language]?.name
    let dto = {
        ...movie, 
        status: movieStatus[movie.status],
        release_date: (new Date(movie.release_date)).toLocaleDateString(),
        profit: profit > 0 ? profit.toLocaleString('pt-BR') : 0,
        budget: movie.budget?.toLocaleString('pt-BR'),
        revenue: movie.revenue?.toLocaleString('pt-BR'),
        runtimeInHours: `${hours}h${minutes}min`,
        original_language: language ? language : movie.original_language,
        vote_average: movie.vote_average * 10
    }
    
    return {movie: dto}
})


export const setMovie = (movie: Movie) => ({type: ActionsTypes.FETCH_MOVIE_SUCCESS, payload: movie})

export const fetchMovie = (movieId: string) => {
    
    const movieUrl = `${config.API_URL}/movie/${movieId}?language=pt-BR&append_to_response=videos`
    return (dispatch: any) => {
        dispatch({type: ActionsTypes.FETCH_MOVIE_START, payload: true});
        return fetch(movieUrl, 
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
            let movie: Movie = {...res, videos: res?.videos?.results || []};
            dispatch(setMovie(movie))
        })
    }
}