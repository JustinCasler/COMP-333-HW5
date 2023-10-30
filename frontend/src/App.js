import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import SongOverview from './components/SongOverview';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import NewRating from './components/NewRating';
import Update from './components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Song OverView</Link>
            </li>
            <li>
              <Link to="user/create">Create User</Link>
            </li>
            <li>
              <Link to="user/login">Login</Link>
            </li>
            <li>
              <Link to="user/newrating">Add New Rating</Link>
            </li>
            <li>
              <Link to="user/update">Update</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<SongOverview />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/login" element={<Login />} />
          <Route path="user/newrating" element={<NewRating />} />
          <Route path="user/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

