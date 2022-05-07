import { useState } from "react";
import { loginUser } from "../../application/commands/login";
import { signUp } from "../../application/commands/sign-up";
import './SignUp.css';

export default function SignUp() {
  const [username, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    signUp(
      username,
      password
    ).then(r => {
      console.log("Sign UP done")
    });
  }

  return(
    <div className="signup-wrapper">
      <h1>Registre</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Correu electrònic</p>
          <input type="text" onChange={e => setUserName(e.target.value)}/>
        </label>
        <label>
          <p>Contrasenya</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <label>
          <p>Confirmar contrasenya</p>
          <input type="password" onChange={e => setRepeatPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Registrar-se</button>
        </div>
        <a href="/">Tornar</a>
      </form>
    </div>
  )
}