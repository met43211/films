import { useSelector } from "react-redux";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { RootState} from '../redux/store'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FilmCard from "../components/FilmCard";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState, useEffect} from 'react'
import { fetchSearch, setKeyWord0 } from "../redux/slices/films";
import { useDispatch} from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';

function SearchResultsPage() {
    const films = useSelector((state: RootState)=> state.searchedFilms)
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const filmsList = Object.assign(films.items)
    const isLoading = films.status === 'loading'
    const {keyWord} = useParams()
    const [country, setCountry] = useState('')
    const [genre, setGenre] = useState('')
    const [year, setYear] = useState('')
    const [filteredFilms, setFilteredFilms] = useState(filmsList)
    useEffect(()=>{
        setFilteredFilms(filmsList)
        setCountry('')
        setGenre('')
        setYear('')
    }, [films])
    useEffect(()=>{
        dispatch(fetchSearch(keyWord as string))
        dispatch(setKeyWord0(keyWord))
    }, [])
    useEffect(()=>{
        setFilteredFilms(filmsList)
        if(country){
            setFilteredFilms((prev:any) => prev.filter((obj: any)=>{
                let isAvalible = false
                obj.countries.map((country0: any)=>{
                    if(country === 'другое'&&(country0.country!='США'||country0.country!='Россия'||country0.country!='Япония'||country0.country!='Китай'||country0.country!='Италия'||country0.country!='Франция')){
                        isAvalible = true
                    }
                    else if(country0.country === country){
                        isAvalible = true
                    }

                })
                return isAvalible
            }))
        }
        if(genre){
            setFilteredFilms((prev:any)=>prev.filter((obj: any)=>{
                let isAvalible = false
                obj.genres.map((genre0: any)=>{
                    if(genre0.genre === genre){
                        isAvalible = true
                    }

                })
                return isAvalible
            }))
        }
        if(year){
            setFilteredFilms((prev:any)=>prev.filter((obj: any)=>{
                const res = Number(year) - Number(obj.year)
                if(res<10 && res>0) return true
                else if (res>10 && year ==='1970') return true
            }))
        }
    }, [country, genre, year])
    if (isLoading){
        return(
            <Box sx={{ display: 'flex', position: 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)'}}>
                <CircularProgress />
            </Box>
        )
    }
    return ( 
        <>
            <Header/>
                <div className="wrapper">
                    <div className="main filter">
                        <FormControl sx={{maxWidth: '200px', width: '100%', marginRight: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Страна</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                label="Страна"
                                onChange={(e)=>setCountry(e.target.value)}
                            >
                                <MenuItem value={'США'}>США</MenuItem>
                                <MenuItem value={'Россия'}>Россия</MenuItem>
                                <MenuItem value={'Япония'}>Япония</MenuItem>
                                <MenuItem value={'Китай'}>Китай</MenuItem>
                                <MenuItem value={'Италия'}>Италия</MenuItem>
                                <MenuItem value={'Франция'}>Франция</MenuItem>
                                <MenuItem value={'другое'}>Другое</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{maxWidth: '200px', width: '100%', marginRight: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genre}
                                label="Жанр"
                                onChange={(e)=>setGenre(e.target.value)}
                            >
                                <MenuItem value={'драма'}>Драма</MenuItem>
                                <MenuItem value={'комедия'}>Комедия</MenuItem>
                                <MenuItem value={'детектив'}>Детектив</MenuItem>
                                <MenuItem value={'милодрама'}>Милодрама</MenuItem>
                                <MenuItem value={'фантастика'}>Фантастика</MenuItem>
                                <MenuItem value={'боевик'}>Боевик</MenuItem>
                                <MenuItem value={'приключения'}>Приключения</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{maxWidth: '200px', width: '100%', marginRight: '10px'}}>
                            <InputLabel id="demo-simple-select-label">Год</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                label="Год"
                                onChange={(e)=>setYear(e.target.value)}
                            >
                                <MenuItem value={'1970'}>До 1970</MenuItem>
                                <MenuItem value={'1980'}>1970-1980</MenuItem>
                                <MenuItem value={'1990'}>1980-1990</MenuItem>
                                <MenuItem value={'2000'}>1990-2000</MenuItem>
                                <MenuItem value={'2010'}>2000-2010</MenuItem>
                                <MenuItem value={'2020'}>2010-2020</MenuItem>
                                <MenuItem value={'2030'}>После 2020</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="outlined" onClick={()=>{
                            setCountry('')
                            setYear('')
                            setGenre('')
                        }}>Стереть</Button>
                    </div>
                    <div className={filteredFilms.length===3?'main jc-start':'main'}>
                        {filmsList?
                            filteredFilms.map((obj: any)=><FilmCard key={obj.filmId} _id={obj.filmId} name={obj.nameRu} year={obj.year} rating={obj.rating} posterUrlPreview={obj.posterUrlPreview}/>):
                            <h3>Ошибка загрузки</h3>
                        }
                        {filteredFilms.length===0&&<h3>
                            Нет таких фильмов
                            </h3>}
                    </div>
                </div>
            <Footer/>
        </>
     );
}

export default SearchResultsPage;