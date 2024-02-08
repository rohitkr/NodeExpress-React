import React, { useEffect, useState } from "react";
import Login from "./components/login";
import Homepage from "./components/homepage";
import Button from "@material-ui/core/Button";
// import {Button as NaviButton} from "navi-design-system"
import styled from "styled-components";

// const NaviButton = styled(Button)`
//   background-color: red;
//   color: white;
//   border-radius: 10px;
//   padding: 10px 20px;
//   margin: 10px;
//   font-size: 20px;
//   font-weight: bold;
// `;


function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setIsUserSignedIn(true);
    else setIsUserSignedIn(false);
  }, []);

  const onLoginSuccessful = () => {
    setIsUserSignedIn(true);
  };

  const onLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setIsUserSignedIn(false);
  };

  // return (
  //   (isUserSignedIn && <Homepage onLogout={onLogout} />) || (
  //     <Login onLoginSuccessful={onLoginSuccessful} />
  //   )
  // );

  return (
    <div>
      <h1>React App</h1>
      <p>isUserSignedIn: {isUserSignedIn.toString()}</p>
      <button onClick={onLoginSuccessful}>Login</button>
      <button onClick={onLogout}>Logout</button>

      <Button onClick={onLoginSuccessful} nonce="C7Jo9Ot7OGp36jCfSpoTKw==">Login</Button>
      <Button onClick={onLogout} nonce="C7Jo9Ot7OGp36jCfSpoTKw==">Logout</Button>
      
      {/* <NaviButton onClick={onLogout} nonce="C7Jo9Ot7OGp36jCfSpoTKw==">Navi Button</NaviButton> */}

    </div>
  );
}

export default App;
