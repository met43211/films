import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

interface FilmCardI{
    name: string,
    year: string,
    rating: string,
    posterUrlPreview: string,
    _id: string
}

function FilmCard({name, year, rating, posterUrlPreview, _id}: FilmCardI) {
    const navigate = useNavigate()
    const handleChooseFilm = ()=>{
      navigate(`/films/${_id}`)
    }
    if(!name){
      return
    }
    return ( 
        <Card sx={{ maxWidth: '380px', width:'100%', marginTop: '20px'}} className='card'>
        <CardMedia
          component="img"
          alt="prewiew"
          height="550"
          image={posterUrlPreview}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          {rating != 'null'&&<Typography variant="body2" color="text.secondary">
              Рейтинг - {rating} <StarIcon sx={{ height: '20px', marginBottom: '-4px', color: 'yellow'}}/>
            </Typography>}
          <Typography variant="body2" color="text.secondary">
            {year} год
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>{handleChooseFilm()}}>Подробнее</Button>
        </CardActions>
      </Card>
     );
}

export default FilmCard;