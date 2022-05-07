import PropTypes from 'prop-types';
import { useState } from "react";
import { loginUser } from "../../application/commands/login";
import './Login.css';

interface IProps {
  setToken: any
}

export default function Login(props: IProps) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    loginUser({
      password,
      email: username
    }).then(res => props.setToken(res.token));
  }

  return(
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Usuari</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Contrasenya</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </form>
      <a href="signup">Registrar-se</a>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}