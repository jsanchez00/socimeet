import TextField from "@mui/material/TextField";
import { useState } from "react";
import { signUp } from "../../application/commands/sign-up";
import './SignUp.css';
import { isValidRequiredField } from '../../domain/utils';
import Button from "@mui/material/Button";
import useToken from "../app/use-token";
import { notificationSystem } from '../../application/commands/notification-system';
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

export default function SignUp() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const [validRepeatPassword, setValidRepeatPassword] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const navigateToHome = (e: any) => {
    window.location.href = "/social/publications";
  }

  const signHandler = async (e: any) => {
    e.preventDefault();
    validPasswordHandler();
    setValidUsername(isValidRequiredField(username as any));
    if(repeatPassword === password && username){
      setIsFetching(true);
      signUp(
        username,
        password
      ).then(r => {
        notificationSystem.success("Enhorabona, alta realitzada correctament");
        sessionStorage.setItem('email', r.user.email);
        setToken(r.token);
        navigateToHome(null);
      })
      .catch(e => notificationSystem.error("Usuari ja registrat"))
      .finally(() => setIsFetching(false));
    }
  }

  const validPasswordHandler = () => {
    if(repeatPassword !== password && password && repeatPassword){
      setValidRepeatPassword(false);
      setValidPassword(false);
    }
    else if(repeatPassword === password && password && repeatPassword){
      setValidRepeatPassword(true);
      setValidPassword(true);
    }
    else {
      setValidPassword(!!password);
      setValidRepeatPassword(!!repeatPassword);
    }
  }

  const onChangeEmailFieldHandler = (value: any) => {
    setUserName(value);
    let isValidEmail = false;
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
      isValidEmail = true;
    }
    
    const isValid = isValidRequiredField(value) && isValidEmail;
    setValidUsername(isValid);
  }

  return !isFetching ?(
    <div className="signup-wrapper">
      <Box sx={{display: "flex", gap: "15px", alignItems: "center"}}>
        <img width={150} src="/assets/logo.png"></img>
        <Typography variant="h2">Socimeet</Typography>
      </Box>
      <h1>Registre</h1>
      <TextField 
        id="username-input" 
        required 
        label="Correu electrònic" 
        variant="standard" 
        error={!validUsername}
        onChange={e => onChangeEmailFieldHandler(e.target.value)}>
      </TextField>
      <TextField 
        id="password-input" 
        required 
        label="Contrasenya" 
        variant="standard" 
        error={!validPassword}
        onBlur={e => validPasswordHandler()}
        type="password" 
        onChange={e => setPassword(e.target.value)}>
          
        </TextField>
        <TextField 
        id="password-input" 
        required 
        label="Confirmar contrasenya" 
        variant="standard" 
        error={!validRepeatPassword}
        onBlur={e => validPasswordHandler()}
        type="password" 
        onChange={e => setRepeatPassword(e.target.value)}>
        </TextField>
        <Button sx={{width: "175px"}} variant="contained" onClick={signHandler}>Registrar-se</Button>
        <Button sx={{width: "175px"}} variant="outlined" href="/">Tornar</Button>
      
    </div>
  ): (
    <div className="progress-container">
      <CircularProgress sx={{width: "100px", height: "100px", alignSelf: "center"}} className="progress" thickness={1} size="80" />    
    </div>
  )
}