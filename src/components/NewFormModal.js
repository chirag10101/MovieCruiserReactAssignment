import React from 'react'
import { useState,createContext,useContext } from'react';
import { Form , Button , Modal } from 'react-bootstrap';
import { useMovieContext } from '../MovieContext';
import axios from 'axios';

const NewModalContext = createContext();

export const NewModalContextProvider = ({ children }) => {
  const [showNew, setNewShow] = useState(false);
  const handleNewClose = () => setNewShow(false);
  const handleNewShow = () => setNewShow(true);
  
  return (
    <NewModalContext.Provider value={{ showNew, setNewShow ,handleNewClose, handleNewShow}}>
      {children}
    </NewModalContext.Provider>
  );
};

export const useNewModalContext = () => {
  return useContext(NewModalContext);
};

export default function NewFormModal() {
    const {movies,setMovies} = useMovieContext();
    const [newmovie,Setnewmovie] = useState();
    const {showNew,handleNewClose} = useNewModalContext();

    const handleChange = (e) => {
        Setnewmovie({...newmovie, [e.target.name]: e.target.value});
    }

    const AddTheMovie=(e)=>{
        e.preventDefault();
        console.log(newmovie);
        const favMovie = movies.find((favMovie) => favMovie.movieID === newmovie.movieID);

        if (favMovie!=null) {
            alert("MovieID is already in Movies");
            return;
        }

        axios.post(`http://localhost:3000/movies`, newmovie).then((res) => {
            console.log(res);
            console.log(res.data);
            setMovies([res.data,...movies]);
            Setnewmovie({
                title: '',
                releaseDate: '',
                posterPath: '',
                movieID:''
            });
        });
        handleNewClose();
    }

    return (
    <Modal show={showNew} onHide={handleNewClose}>
        <Modal.Header closeButton>
        <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={AddTheMovie}>
                <Form.Group controlId="movietitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title"  name="title" id='newmovietitle' onChange={handleChange}/>
                <Form.Label>Movie ID</Form.Label>
                <Form.Control type="text" placeholder="Enter Movie ID" name='movieID' id='newmovieid' onChange={handleChange} />
                <Form.Label>Release year</Form.Label>
                <Form.Control type="text" placeholder="Enter year" name='releaseDate' id='newmovieyear' onChange={handleChange} />
                <Form.Label>Image Link</Form.Label>
                <Form.Control type="text" placeholder="Image link" name='posterPath' id='newmovieimglink' onChange={handleChange} />
                <Button className='mt-3' type="submit" >Add the Movie</Button>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleNewClose}>
            Close
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
