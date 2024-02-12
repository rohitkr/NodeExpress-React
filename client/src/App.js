import React from "react";
import JssButton from "./components/JssButton/JssButton";
import "./App.css";


const App = () => (
  <>
    <div className="App-header"> React App Header </div>
    <div style={{width: "100%", height: "100px", background: "#e4eb6c", textAlign: "center", fontSize: "2rem"}}> React </div>
    <JssButton>Click me</JssButton>
  </>
);

export default App;
