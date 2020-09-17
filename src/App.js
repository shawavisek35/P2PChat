import React from 'react';
import './App.css';
import Login from "./Components/notAuthenticated/login";
import {
  isAuth
} from "./helper/auth";
import Home from "./Components/Authenticated/Home";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="container main-container mt-5 shadow-lg">
        {
          isAuth()
          ?
          <Home />
          :
          <Login />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
