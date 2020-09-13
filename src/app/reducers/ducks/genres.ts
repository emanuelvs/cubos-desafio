import reducerSelector from '../reducerSelector';
import config from '../../config';

export type Genre = {
    id: number,
    name: string
}

export enum ActionsTypes {
    FETCH_GENRE_START='get/genre/start',
    FETCH_GENRE_SUCCESS='get/genre/success',
    FETCH_GENRE_ERROR='get/genre/error'
}

type State = {
    genres: Array<Genre>
    loading: Boolean
    error: Boolean
}

export type Actions = {
    FETCH_GENRE_START: {type: ActionsTypes.FETCH_GENRE_START, payload: any},
    FETCH_GENRE_SUCCESS: {type: ActionsTypes.FETCH_GENRE_SUCCESS, payload: any},
    FETCH_GENRE_ERROR: { type: ActionsTypes.FETCH_GENRE_ERROR, payload: Error }
}

const initialState: State = {
    genres: [],
    loading: false,
    error: false
}


export const genresReducer = reducerSelector(initialState, {
    [ActionsTypes.FETCH_GENRE_START](state: State, a:Actions['FETCH_GENRE_START']){
        var dto: State = {...state, loading: true};
        return dto
    },
    [ActionsTypes.FETCH_GENRE_SUCCESS](state: State, a:Actions['FETCH_GENRE_SUCCESS']){
        var dto: State = {...state, genres: a.payload, loading: false}
        return dto
    },
    [ActionsTypes.FETCH_GENRE_ERROR](state: State, a:Actions['FETCH_GENRE_ERROR']){
        var dto: State = {...state, error: true, loading: false}
        return dto
    }
})

//Selectors

const mainSelector = (cb: any) => {
    return (state: any) => cb(state.genres);
}

export const genres = mainSelector((state: State) => {
    const {genres} = state;
    return {genres}
})

export const genresNormalized = mainSelector((state: State) => {
    const {genres} = state;
    interface genreIds {
        [key: string]: number
    }
    var dto: genreIds = {}
    genres.forEach(element => {
        let nome = (element?.name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase();
        dto[nome] = element.id;
    });
    return {genresNormalized: dto};
})

export const updateGenres = (genres: Genre[]) => ({type: ActionsTypes.FETCH_GENRE_SUCCESS, payload: genres})

export const fetchGenres = () =>{

    const genreUrl = `${config.API_URL}/genre/movie/list?language=pt-BR`;

    return (dispatch: any) => {
        dispatch({type: ActionsTypes.FETCH_GENRE_START, payload: true});
        return fetch(genreUrl, 
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
            let genres: Genre[] = res.genres;
            dispatch(updateGenres(genres))
        })
    }
}