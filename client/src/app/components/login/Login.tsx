import { Box, Typography } from "@mui/material";
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
  const navigateToHome = () => {
    window.location.href = "/social/publications";
  }
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
        props.setToken(res.token);
        navigateToHome();
      })
      .catch(e => {
        notificationSystem.error("Dades incorrectes")
      })
      .finally(() => setIsFetching(false));
    }
  }

  return !isFetching ? (
    <div className="login-wrapper">
      <Box sx={{display: "flex", gap: "15px", alignItems: "center"}}>
        <img width={150} src="/assets/logo.png"></img>
        <Typography variant="h2">Socimeet</Typography>
      </Box>
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
      <Button sx={{width: "175px"}} variant="contained" onClick={e => handleSubmit(e)}>Entrar</Button>
      <Button sx={{width: "175px"}} variant="outlined" href="/signup" >Registrar-se</Button>
    </div>
  )
  : (
    <div className="progress-container">
      <CircularProgress sx={{width: "100px", height: "100px", alignSelf: "center"}} className="progress" thickness={1} size="80" />    
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}