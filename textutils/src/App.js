import './App.css';
import Navbar from './components/Navbar.js'
import About from './components/About.js'
import TextForm from './components/TextForm.js'
import React, { useState } from 'react'
// import Alert from './components/Alert.js'


function App() {
  const [mode, setMode] = useState('light');
  // const [alert, setAlert] = useState(null);

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  // }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'grey';
      // showAlert("dark mode has been enabled", "success");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // showAlert("light mode has been enabled", "success");
    }
  }
  return (
    <>
      <Navbar title="TextUtils" aboutText="AboutTextUtils" mode={mode} toggleMode={toggleMode} />
      {/* <Alert alert={alert} /> */}
      <div className="container">
        <TextForm heading="Enter the text here to analyze" mode={mode} />
        <About />
      </div>
    </>
  );
}

export default App;
