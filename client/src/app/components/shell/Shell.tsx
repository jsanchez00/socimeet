import SettingsIcon from '@mui/icons-material/Settings';
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';
import { useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Profile from '../profile/Profile';
import './Shell.css';
import { useNavigate } from 'react-router-dom';


interface IProps {
  setToken: any;
}

export default function Shell(props: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [navTitle, setNavTitle] = useState<string>("Social");

  const navigate = useNavigate()

  const path = window.location.pathname;

  if(path == "/profile" && navTitle !== "Perfil"){
    setNavTitle("Perfil");
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const navigateToProfile = (e: any) => {
    navigate("/profile");
  }

  const handleLogout = () => {
    props.setToken('');
    window.location.href = "/";
  };

  return(
    <div className="shell-wrapper">
      <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navTitle}
        </Typography>

        <div>
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
            >
              <MenuItem onClick={navigateToProfile}>Perfil</MenuItem>
              <MenuItem  onClick={handleLogout}>Desconectar</MenuItem>
            </Menu>
        </div>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="profile" element={<Profile />}></Route>
      </Routes> 
    </div>
  )
}
Shell.propTypes = {
  setToken: PropTypes.func.isRequired
}