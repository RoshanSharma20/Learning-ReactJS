import './App.css';
import Navbar from './components/Navbar.js'
import About from './components/About.js'
import TextForm from './components/TextForm.js'
import React, { useState } from 'react'
import Alert from './components/Alert.js'
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');
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
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      showAlert("dark mode has been enabled", "success");
      document.title = "TextUtils-Dark Mode";
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("light mode has been enabled", "success");
      document.title = "TextUtils-Light Mode";
    }
  }
  return (
    <>
      <Router>
        <Navbar title="TextUtils" aboutText="AboutTextUtils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/about" element={<About />}>
            </Route>
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter the text here to analyze" mode={mode} />}>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
