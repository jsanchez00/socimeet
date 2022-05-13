import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from "react";
import { loginUser } from "../../application/commands/login";
import { notificationSystem } from "../../application/commands/notification-system";
import { isValidRequiredField } from '../../domain/utils';
import './Login.css';

interface IProps {
  setToken: any
}


export default function Login(props: IProps) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validUsername, setValidUsername] = useState<boolean>(true);

  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setValidUsername(isValidRequiredField(username as any));
    setValidPassword(isValidRequiredField(password as any));
    
      
    if(password && username){
      setIsFetching(true);
      loginUser({
        password,
        email: username
      }).then(res => {
        sessionStorage.setItem('email', res.user.email);
        return props.setToken(res.token);
      })
      .catch(e => {
        notificationSystem.error("Dades incorrectes")
      })
      .finally(() => setIsFetching(false));
    }
  }

  return !isFetching ? (
    <div className="login-wrapper">
      <h1>Login</h1>
      <TextField 
        id="username-input" 
        required 
        label="Usuari" 
        variant="standard" 
        error={!validUsername}
        onBlur={e => setValidUsername(isValidRequiredField(e.target.value))}
        onChange={e => setUserName(e.target.value)}>
        </TextField>
      <TextField 
        id="password-input" 
        required 
        label="Contrasenya" 
        variant="standard" 
        error={!validPassword}
        onBlur={e => setValidPassword(isValidRequiredField(e.target.value))}
        type="password" 
        onChange={e => setPassword(e.target.value)}>
          
        </TextField>
      <Button variant="contained" onClick={e => handleSubmit(e)}>Entrar</Button>
      <Button variant="outlined" href="/signup" >Registrar-se</Button>
    </div>
  )
  : (
    <CircularProgress className="progress" thickness={1} size="80" />    
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}