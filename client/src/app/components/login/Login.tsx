import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import { useState } from "react";
import { loginUser } from "../../application/commands/login";
import './Login.css';
import { isValidRequiredField } from '../../domain/utils';

interface IProps {
  setToken: any
}


export default function Login(props: IProps) {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validUsername, setValidUsername] = useState<boolean>(true);

  const navigateToSignUp = (e: any) => {
    window.location.href = "/signup";
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setValidUsername(isValidRequiredField(username as any));
    setValidPassword(isValidRequiredField(password as any));
    
      
    if(password && username){
      loginUser({
        password,
        email: username
      }).then(res => props.setToken(res.token));
    }
  }

  return(
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
      <Button onClick={e => handleSubmit(e)}>Entrar</Button>
      <Button onClick={e => navigateToSignUp(e)}>Registrar-se</Button>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}