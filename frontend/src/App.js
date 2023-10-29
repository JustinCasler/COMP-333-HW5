import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import SongOverview from './components/SongOverview';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
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
          </ul>
        </nav>
        <Routes>
          <Route index element={<SongOverview />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

