import { Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { updateUserInfo } from '../../application/commands/update-user-info';
import { userInfoSelector } from "../../application/queries/user-info-selector";
import './Profile.css';
import { useState, useEffect } from 'react';
import { lensProp, set } from "ramda";


export default function Profile() {

  const [newUserInfo, setNewUserInfo] = useState(useSelector(userInfoSelector));
  const [isFetching, setIsFetching] = useState(false);

  const saveHandler = (e: any) => {
    setIsFetching(true);
    updateUserInfo(newUserInfo).finally(() => setIsFetching(false))
  }

  const onChangeField = (field: string, value: any) => {
    setNewUserInfo(set(lensProp(field), value, newUserInfo));
  }

  return !isFetching ? (
    <div className="profile-wrapper">
      <div className="profile-row">
        <TextField
          id="email-input"
          disabled
          label="Email"
          variant="standard"
          value={newUserInfo.email}
        ></TextField>
        <TextField
          id="nick-input"
          label="Nick"
          variant="standard"
          defaultValue={newUserInfo.nick}
          onChange={e=> onChangeField("nick", e.currentTarget.value)}
        ></TextField>
        <TextField
          id="name-input"
          label="Nom"
          variant="standard"
          onChange={e=> onChangeField("name", e.currentTarget.value)}
          defaultValue={newUserInfo.name}
        ></TextField>
        <TextField
          id="surname-input"
          label="Cognoms"
          variant="standard"
          onChange={e=> onChangeField("surname", e.currentTarget.value)}
          defaultValue={newUserInfo.surname}
        ></TextField>
      </div>
      
      <TextField
        id="description-input"
        label="Descripció personal"
        variant="outlined"
        onChange={e=> onChangeField("description", e.currentTarget.value)}
        defaultValue={newUserInfo.description}
        rows={5}
        multiline
      ></TextField>
      <Button id="save-profile-btn" variant="contained" onClick={saveHandler}>Guardar</Button>
    </div>
  ) : (
    <div className="profile-wrapper">
      <div className="profile-progress-container">
        <CircularProgress thickness={1} size="80"></CircularProgress>
      </div>
    </div>
  )
}
