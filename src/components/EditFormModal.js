import React, { createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useState , useContext } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from'react-bootstrap';
import { useMovieContext } from '../MovieContext';

const EditModalContext = createContext();

export const EditModalContextProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [editmovie, SetEditMovie] = useState({
    title: '',
    releaseDate: '',
    posterPath: ''
  });

  return (
    <EditModalContext.Provider value={{ show, setShow ,handleClose, handleShow, editmovie,SetEditMovie}}>
      {children}
    </EditModalContext.Provider>
  );
};

export const useEditModalContext = () => {
  return useContext(EditModalContext);
};

export default function EditFormModal() {
  const {movies,setMovies}=useMovieContext();
  const {show,setShow,handleClose,editmovie, SetEditMovie} = useEditModalContext();
  const EditTheMovie=(e)=>{
      e.preventDefault();
      console.log(editmovie);
      axios.put(`http://localhost:3000/movies/${editmovie.id}`, editmovie).then((res) => {
        console.log(res);
        console.log(res.data);
        setShow(false);
        const index = movies.findIndex((movie) => movie.id === editmovie.id);
        const updatedMovies = [...movies];
        updatedMovies[index] = editmovie;
        setMovies(updatedMovies);
      });
  }

  const handleChange = (e) => {
    SetEditMovie({...editmovie, [e.target.name]: e.target.value});
    
  }


  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={EditTheMovie}>
            <Form.Group controlId="movietitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" id='editmovietitle' value={editmovie.title} onChange={handleChange}/>
              <Form.Label>Release year</Form.Label>
              <Form.Control type="text" placeholder="Enter year" name='releaseDate' id='editmovieyear' value={editmovie.releaseDate} onChange={handleChange} />
              <Form.Label>Image Link</Form.Label>
              <Form.Control type="text" placeholder="Image link" name='posterPath' id='editmovieimglink' value={editmovie.posterPath} onChange={handleChange} />
              <Button className='mt-3' type="submit" >Edit the Movie</Button>
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
