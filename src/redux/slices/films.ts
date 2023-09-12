import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchFilms = createAsyncThunk('films/fetchFilms', async()=>{
    const {data} = await axios.get('/api/v2.2/films/top') as any
    return data.films
})

export const fetchSearch = createAsyncThunk('films/fetchSearch', async(keyWord:string)=>{
    const {data} = await axios.get(`/api/v2.1/films/search-by-keyword?keyword=${encodeURIComponent(keyWord)}&page=1`) as any
    return data.films
})

export const fetchOneFilm = createAsyncThunk('films/fetchOneFilm', async(id:any)=>{
    const {data} = await axios.get(`/api/v2.2/films/${id}`) as any
    return data
})

export const initalState = {
    films: {
        items: [],
        status: 'loading'
    },
    searchedFilms: {
        items: [],
        status: 'loading'
    },
    pickedFilm:  {
        film: {} as any,
        status: 'loading'
    },
    keyWord: '',
}

const filmsSlice = createSlice({
    name: 'films',
    initialState: initalState,
    reducers: {
        setKeyWord0: (state, action)=>{
            state.keyWord = action.payload
        },
    },
    extraReducers: {
        [fetchFilms.pending as any]: (state: any)=>{
            state.films.status = 'loading'
        },
        [fetchFilms.fulfilled as any]: (state: any, action: any)=>{
            state.films.items = action.payload
            state.films.status = 'loaded'
        },
        [fetchFilms.rejected as any]: (state: any)=>{
            state.films.items = []
            state.films.status = 'error'
        },
        [fetchSearch.pending as any]: (state: any)=>{
            state.searchedFilms.status = 'loading'
        },
        [fetchSearch.fulfilled as any]: (state: any, action: any)=>{
            state.searchedFilms.items = action.payload
            state.searchedFilms.status = 'loaded'
        },
        [fetchSearch.rejected as any]: (state: any)=>{
            state.searchedFilms.items = []
            state.searchedFilms.status = 'error'
        },
        [fetchOneFilm.pending as any]: (state: any)=>{
            state.pickedFilm.status = 'loading'
        },
        [fetchOneFilm.fulfilled as any]: (state: any, action: any)=>{
            state.pickedFilm.film = action.payload
            state.pickedFilm.status = 'loaded'
        },
        [fetchOneFilm.rejected as any]: (state: any)=>{
            state.pickedFilm.film = {}
            state.pickedFilm.status = 'error'
        }
    }
})
export const filmsReducer = filmsSlice.reducer
export const {setKeyWord0} = filmsSlice.actions