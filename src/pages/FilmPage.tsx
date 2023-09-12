import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchOneFilm } from "../redux/slices/films";
import {ThunkDispatch} from "@reduxjs/toolkit";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FilmPage() {
    const navigate = useNavigate()
    const {id} = useParams()
    const pickedFilm = useSelector((state: RootState)=> state.pickedFilm)
    let isLoading = pickedFilm.status === 'loading'
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    useEffect(()=>{
        dispatch(fetchOneFilm(id))
    }, [])
    if(isLoading){
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
                    <div className="main mb">
                        <Button variant="contained" className="btn" onClick={()=>{navigate(-1)}}><ArrowBackIcon/></Button>
                    </div>
                    <div className="main">
                        <Card className="film-page-card" sx={{ maxWidth: '1440px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <CardMedia
                                component="img"
                                height="100%"
                                sx={{ maxWidth: '48%' }}
                                image={pickedFilm.film.posterUrl}
                                alt="film"
                                />
                                <CardContent sx={{width: '48%', marginRight: '15px' }}>
                                    <Typography gutterBottom variant="h2" component="div">
                                        {pickedFilm.film.nameRu}
                                    </Typography>
                                    <Typography gutterBottom variant="h4" component="div" color="text.secondary">
                                        {pickedFilm.film.nameOriginal} - {pickedFilm.film.year}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                                        Кинопоиск - {pickedFilm.film.ratingKinopoisk} <StarIcon sx={{ height: '30px', margin: '0 40px -5px 5px', color: 'yellow'}}/>
                                        Imdb - {pickedFilm.film.ratingImdb} <StarIcon sx={{ height: '30px', margin: '0 40px -5px 5px', color: 'yellow'}}/>
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                                        Страна - {pickedFilm.film.countries.map((obj: any, index: number)=><span key={index}>{obj.country}{index!=pickedFilm.film.countries.length-1&&<span>, </span>}</span>)}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                                        Жанр: {pickedFilm.film.genres.map((obj: any, index: number)=><span key={index}>{obj.genre}{index!=pickedFilm.film.genres.length-1&&<span>, </span>}</span>)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{marginBottom:'15px', marginTop:'30px'}}>
                                        {pickedFilm.film.slogan}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {pickedFilm.film.description}
                                    </Typography>
                                </CardContent>
                        </Card>
                    </div>
                </div>
            <Footer/>
        </>
    );
}

export default FilmPage;