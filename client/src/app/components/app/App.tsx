import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "../login/Login";
import Shell from "../shell/Shell";
import SignUp from '../sign-up/SignUp';
import './App.css';
import useToken from "./use-token";

function App() {
  const { token, setToken } = useToken();
  const path = window.location.pathname;
  if(!token && path !== "/signup"){
    return (<Login setToken={setToken} />);
  }

  return (
    <div className="wrapper">
      <h1>Socimeet</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shell />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;