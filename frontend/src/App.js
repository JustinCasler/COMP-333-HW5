import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import SongOverview from './components/SongOverview';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import NewRating from './components/NewRating';
import Update from './components/Update';
import Delete from './components/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SongOverview />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/login" element={<Login />} />
          <Route path="user/newrating" element={<NewRating />} />
          <Route path="user/update" element={<Update />} />
          <Route path="user/delete" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

