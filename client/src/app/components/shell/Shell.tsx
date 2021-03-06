import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { fetchUserInfo } from '../../application/commands/fetch-user-info';
import { userInfoSelector } from '../../application/queries/user-info-selector';
import Profile from '../profile/Profile';
import './Shell.css';
import GroupsIcon from '@mui/icons-material/Groups';
import SocialShell from '../../../social/components/shell/Social-shell';
import { ListItemIcon, ListItemText } from "@mui/material";

interface IProps {
  setToken: any;
}

let userInfoCalled = false;

export default function Shell(props: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navTitle, setNavTitle] = useState<string>("Social");
  const [email] = useState<string>(sessionStorage.getItem('email') as any);

  const userInfo = useSelector(userInfoSelector);

  useEffect(() => {
    if(!userInfo?.email && email && !userInfoCalled){
      userInfoCalled = true;
      fetchUserInfo(email);
    }
  }, [userInfo, email]);

  const navigate = useNavigate()

  const path = window.location.pathname;

  if(path === "/profile" && navTitle !== "Perfil"){
    setNavTitle("Perfil");
  }
  else if(path === "/social" && navTitle !== "Social"){
    setNavTitle("Social");
  }
  else if(path === "/social/friends" && navTitle !== "Social - Amistats"){
    setNavTitle("Social - Amistats");
  }
  else if(path === "/social/publications" && navTitle !== "Social - Publicacions"){
    setNavTitle("Social - Publicacions");
  }
  else if(path.includes("/social/messages") && navTitle !== "Social - Xats"){
    setNavTitle("Social - Xats");
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateToProfile = (e: any) => {
    navigate("/profile");
    setAnchorEl(null);
  }

  const handleLogout = () => {
    props.setToken('');
    sessionStorage.setItem('email', "");
    window.location.href = "/";
  };

  return(
    <div className="shell-wrapper">
      <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            {navTitle}
        </Typography>

        <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={e=> navigate("social/publications")}
              color="inherit"
            >
              <GroupsIcon/>
            </IconButton>
          
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={navigateToProfile}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Desconectar</ListItemText>
              </MenuItem>
            </Menu>
        </div>
        </Toolbar>
      </AppBar>
      <div className="shell-container">
        <Routes>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="social/*" element={<SocialShell />}></Route>
        </Routes> 
      </div>
    </div>
  )
}
Shell.propTypes = {
  setToken: PropTypes.func.isRequired
}