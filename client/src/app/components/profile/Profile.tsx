import './Profile.css';
import { getState } from '../../store/index';
import { userInfoSelector } from "../../application/queries/user-info-selector";


export default function Profile() {

  const userInfo = userInfoSelector(getState());

  return (
    <div className="profile-wrapper">
      {userInfo.name}
      {/* <TextField 
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
      <Button href="/signup" >Registrar-se</Button> */}
    </div>
  )
}
