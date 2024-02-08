import logo from './logo.svg';
import './App.css';
import React from 'react';
import Button from "@material-ui/core/Button";

function App() {
  return (
    <div className="App">
      <div>
        <h1>My First React App</h1>

        <Button variant="contained" color="primary">
          Hello World
        </Button>

        <p>Welcome to my first react app. This is a simple react app that I created to learn the basics of react.</p>
      </div>
    </div>
  );
}

export default App;
