import TextField from "@mui/material/TextField";
import { useState } from "react";
import { signUp } from "../../application/commands/sign-up";
import './SignUp.css';
import { isValidRequiredField } from '../../domain/utils';
import Button from "@mui/material/Button";
import useToken from "../app/use-token";
import { notificationSystem } from '../../application/commands/notification-system';
import CircularProgress from "@mui/material/CircularProgress";

export default function SignUp() {
  const { token, setToken } = useToken();
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  const [validPassword, setValidPassword] = useState<boolean>(true);
  const [validUsername, setValidUsername] = useState<boolean>(true);
  const [validRepeatPassword, setValidRepeatPassword] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const navigateToLogin = (e: any) => {
    window.location.href = "/";
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
        navigateToLogin(null);
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

  return !isFetching ?(
    <div className="signup-wrapper">
      <h1>Registre</h1>
      <TextField 
        id="username-input" 
        required 
        label="Correu electrònic" 
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
        <Button variant="contained" onClick={signHandler}>Registrar-se</Button>
        <Button variant="outlined" href="/">Tornar</Button>
      
    </div>
  ): (
    <div className="progress-container">
      <CircularProgress className="progress" thickness={1} size="80" />    
    </div>
  )
}