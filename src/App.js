
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AllMovies from './components/AllMovies';
import FavMovies from './components/FavMovies';
import { MovieProvider } from './MovieContext';
import EditFormModal, { EditModalContextProvider } from './components/EditFormModal';
import NewFormModal, { NewModalContextProvider } from './components/NewFormModal';

function App() {
  return (
    <MovieProvider>
      <EditModalContextProvider>
        <NewModalContextProvider>
          <NewFormModal/>
          <EditFormModal/>
          <div className="row container-fluid d-flex justify-content-center">
            <AllMovies/> 
            <FavMovies/>
          </div>
        </NewModalContextProvider>
      </EditModalContextProvider>
    </MovieProvider>
  );
}

export default App;
