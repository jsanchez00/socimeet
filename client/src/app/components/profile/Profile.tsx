import { Avatar, Button, CircularProgress } from "@mui/material";
import TextField from "@mui/material/TextField";
import { clone, lensProp, set } from "ramda";
import { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from "react-redux";
import { updateAvatar } from "../../application/commands/update-avatar";
import { updateUserInfo } from '../../application/commands/update-user-info';
import { userInfoSelector } from "../../application/queries/user-info-selector";
import './Profile.css';

import AttachmentIcon from '@mui/icons-material/Attachment';
import { updateUserAction } from "../../application/commands/update-user-action";


export default function Profile() {

  const userInfo = useSelector(userInfoSelector, shallowEqual);
  const [isFetching, setIsFetching] = useState(false);

  const saveHandler = (e: any) => {
    setIsFetching(true);
    updateUserInfo(userInfo).finally(() => setIsFetching(false))
  }

  const onChangeField = (field: string, value: any) => {
    updateUserAction(set(lensProp(field), value, userInfo));
  }

  const handleAvatarChange = (e: any) => {
    updateAvatar(e.target.files);
  }

  return !isFetching && userInfo?.email ? (
    <div className="profile-wrapper">
      <Avatar
        alt={userInfo.name}
        src={userInfo.avatar }
        sx={{ width: 100, height: 100 }}
      />
      <label className="label-upload">
        <AttachmentIcon></AttachmentIcon>
        Modificar imatge perfil
        <input id="avatar-file-input" type="file" name="avatar" onChange={handleAvatarChange} accept="image/png,image/jpeg,image/jpg" />
      </label>
      
      <div className="profile-row">
        <TextField
          id="email-input"
          disabled
          label="Email"
          variant="standard"
          value={userInfo.email}
        ></TextField>
        <TextField
          id="nick-input"
          label="Nick"
          variant="standard"
          defaultValue={userInfo.nick}
          onChange={e=> onChangeField("nick", e.currentTarget.value)}
        ></TextField>
        <TextField
          id="name-input"
          label="Nom"
          variant="standard"
          onChange={e=> onChangeField("name", e.currentTarget.value)}
          defaultValue={userInfo.name}
        ></TextField>
        <TextField
          id="surname-input"
          label="Cognoms"
          variant="standard"
          onChange={e=> onChangeField("surname", e.currentTarget.value)}
          defaultValue={userInfo.surname}
        ></TextField>
      </div>
      
      <TextField
        id="description-input"
        label="Descripció personal"
        variant="outlined"
        onChange={e=> onChangeField("description", e.currentTarget.value)}
        defaultValue={userInfo.description}
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
  );
}
