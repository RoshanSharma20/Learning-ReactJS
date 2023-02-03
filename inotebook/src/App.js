import './App.css';
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NotesState from './context/notes/NotesState'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState("");
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert("");
    }, 1500);
  }
  return (
    <div className="App">
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}>
              </Route>
              <Route exact path="/about" element={<About />}>
              </Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}>
              </Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}>
              </Route>
            </Routes>
          </div>
        </Router>
      </NotesState>
    </div>
  );
}

export default App;
