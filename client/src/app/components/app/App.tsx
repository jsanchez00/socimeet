import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../login/Login";
import Shell from "../shell/Shell";
import './App.css';
import useToken from "./use-token";

function App() {
  const { token, setToken } = useToken();

  if(!token){
    return (<Login setToken={setToken} />);
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;