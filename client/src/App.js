import React from "react";
import JssButton from "./components/JssButton/JssButton";
import NaviButton from "./components/NaviButton/NaviButton";
import "./App.css";


const App = () => (
  <>
    <div className="App-header"> React App Header modified </div>
    <div style={{width: "100%", height: "100px", background: "#e4eb6c", textAlign: "center", fontSize: "2rem"}}> React </div>
    <JssButton>Click me</JssButton>
    <NaviButton>Navi Button</NaviButton>
  </>
);

export default App;
