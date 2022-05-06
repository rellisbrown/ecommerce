import React from 'react';
import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Grid from '@mui/material/Grid';

import { Routes, Route, Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../utils/useAuth';
import useUser from '../utils/useUser';

import CatLogo from '../assets/CatLogo';

const StyledGridContainer = styled(Grid)`
  height: 100px;
  box-shadow: -1px 3px 6px 2px #88888854;
`;

const StyledAvatarContainer = styled.div`
  display: flex;
  margin: auto;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  margin: auto;
`;

const StyledTitleText = styled.h3`
  /* font-family: 'Faster One', cursive; */
  font-family: 'Akronim', cursive;
  font-size: 3rem;
  display: flex;
  margin: auto;
  font-weight: 400;
`;

const StyledSignInContainer = styled.div`
  display: flex;
  margin: auto;
`;

const StyledSignInText = styled.p`
  font-size: 1rem;
`;

const StyledCatLogo = styled(CatLogo)`
  display: flex;
  margin: auto auto auto 2rem;
`;

const Navigation = () => {
  const { user, auth } = useAuth();
  const userData = useUser(user?.uid);
  console.log(userData);

  console.log(user);
  const [avatarEl, setAvatarEl] = React.useState(null);
  const open = Boolean(avatarEl);
  const handleClick = (event) => {
    setAvatarEl(event.currentTarget);
  };
  const handleClose = () => {
    setAvatarEl(null);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // eslint-disable-next-line
        /*  user?.refreshToken; */
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <StyledGridContainer container spacing={2}>
      <Grid item xs={2} />

      <Grid item xs={8} style={{ display: 'flex' }}>
        <StyledTitleContainer>
          <StyledTitleText>Jimbob&apos;s Cat Emporium</StyledTitleText>
          <StyledCatLogo className="className" />
        </StyledTitleContainer>
      </Grid>
      <Grid item xs={2} style={{ display: 'flex' }}>
        {user ? (
          <StyledAvatarContainer>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {userData.firstName ? userData.firstName[0] : ''}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={avatarEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                </ListItemIcon>
                Cart
              </MenuItem>

              <MenuItem onClick={handleSignOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </StyledAvatarContainer>
        ) : (
          <StyledSignInContainer>
            <StyledSignInText>
              <Link to="/signin">Sign In / Register</Link>
            </StyledSignInText>
          </StyledSignInContainer>
        )}
      </Grid>
    </StyledGridContainer>
  );
};

export default Navigation;
