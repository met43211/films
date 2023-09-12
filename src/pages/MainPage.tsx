import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState} from '../redux/store'
import { fetchFilms, setKeyWord0 } from "../redux/slices/films";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FilmCard from "../components/FilmCard";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function MainPage() {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const films = useSelector((state: RootState)=> state.films)
    const isLoading = films.status === 'loading'
    const isError = films.status === 'error'
    const filmsList = Object.assign(films.items)
    useEffect(()=>{
        dispatch(setKeyWord0(''))
        dispatch(fetchFilms())
    }, [])
    if(isLoading){
        return(
            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </Box>
        )
    }
    if(isError){
        return(
            <h1 className="error-h">Ошибка загрузки</h1>
        )
    }
    return ( 
        <>
            <Header/>
            <div className="wrapper">
                <div className="main"><h1>Топ фильмов</h1></div>
                <div className="main">
                    {isLoading?
                        <div className="loading">
                            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                <CircularProgress />
                            </Box>
                        </div>:
                        filmsList?
                            filmsList.map((obj: any)=><FilmCard key={obj.filmId} _id={obj.filmId} name={obj.nameRu} year={obj.year} rating={obj.rating} posterUrlPreview={obj.posterUrlPreview}/>):
                            <h3>Ошибка загрузки</h3>
                    }
                </div>
            </div>
            <Footer/>
        </>
     );
}

export default MainPage;