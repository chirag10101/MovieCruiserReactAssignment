import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useMovieContext } from '../MovieContext';
import  { useEditModalContext } from './EditFormModal';
import {useNewModalContext} from './NewFormModal';

export default function AllMovies() {

    const {addToFavorite,favoriteMovies,movies,setMovies} = useMovieContext();
    const {handleShow,SetEditMovie} =useEditModalContext();
    const {handleNewShow}=useNewModalContext();
    const FetchMoviesData = () => {
        axios
            .get("http://localhost:3000/movies")
            .then(data => {
                console.log(data.data);
                setMovies(data.data);
            } )
            .catch(error => console.log(error));
    };

    useEffect(() => {
        FetchMoviesData();
        // eslint-disable-next-line
     },[]);

    const addtoFavourite = (movie) => {
        const favMovie = favoriteMovies.find((favMovie) => favMovie.movieID === movie.movieID);

        if (favMovie!=null) {
            alert("Movie is already in favorites");
            return;
        }
        const temp = {
            title: movie.title,
            releaseDate: movie.releaseDate,
            posterPath: movie.posterPath,
            movieID: movie.movieID,
        };
        axios.post(`http://localhost:3000/favourites`, temp).then((res) => {
          console.log(res);
          console.log(res.data);
          addToFavorite(res.data);
        });
    };

    const EditOnClick = (movie) => {
        SetEditMovie(movie);
        handleShow();
    };

    const NewOnClick = () => {
        handleNewShow();
    };

    return (
            <div id="cards"  className="col-5 col-sm-5">
                <button className="btn btn-dark m-3" onClick={()=>NewOnClick()} >Add New movie</button>
                <h4 className="m-3">All Movies</h4>
                {movies.map(movie => (
                <div className="card m-3 border-info bg-info-subtle" key={movie.movieID} style={{width: '18 rem'}}>
                    <img className="card-img-top" src={movie.posterPath} alt="Movie Banner" style={{ height: '250px'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">Release Date : {movie.releaseDate}</p>
                        <button id={movie.id} className="btn btn-primary" onClick={()=>addtoFavourite(movie)} >Add Favourite</button>
                        <button type="button" className="btn btn-light border-info border-1 ms-3" onClick={()=>EditOnClick(movie)}>Edit</button>
                    </div>
                </div>
                ))}
            </div>
            
            
    )
}


