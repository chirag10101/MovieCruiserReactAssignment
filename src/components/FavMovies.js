import React from 'react'
import {  useEffect  } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import { useMovieContext } from '../MovieContext';

export default function FavMovies() {
    const {favoriteMovies,setFavoriteMovies, removeFromFavorite}  = useMovieContext();

    const FetchFavMoviesData = () => {
        axios
            .get("http://localhost:3000/favourites")
            .then(data => {
                console.log(data.data);
                setFavoriteMovies(data.data);
            } )
            .catch(error => console.log(error));
    }; 

    const RemoveFromFavourites=(movie)=>{
        removeFromFavorite(movie);
        axios.delete("http://localhost:3000/favourites/"+movie.id).then(res => {
            console.log(res);
            console.log(res.data);
        })
    }

    useEffect(() => {
        FetchFavMoviesData();
     },[]); 

    return (
            <div id="favCards" className="col-5 col-sm-5"  style={{marginTop: 65}}>
              <h4 className="m-3">Favourites</h4>
              {favoriteMovies.map(movie => (
                    <div className="card m-3 border-info bg-info-subtle" key={movie.movieID} style={{width: '18 rem',height:'10 rem'}}>
                        <img className="card-img-top" src={movie.posterPath} alt="Movie Poster" style={{ height: '250px'}}/>
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">Release Date : {movie.releaseDate}</p>
                            <button id={movie.id} className="btn btn-danger" onClick={()=>RemoveFromFavourites(movie)} >Delete</button>
                        </div>
                    </div>
                ))}
            </div>
    )
}
