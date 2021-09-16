import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import LockIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useHistory } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { DialogTitle } from '@material-ui/core';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function UserMenu(props) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    handleClose();
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e) => {
    switch (e.target.id){
      case 'username':
        setUsername(e.target.value)
        break;
      case 'old_password':
        setOldPassword(e.target.value)
        break;
      case 'password':
        setPassword(e.target.value)
        break;
      default:
        break; 
    } 
  }

  async function handleClickChange(){
    const data = {username:username, password:password, oldPassword:oldPassword}
    await axios.post("http://localhost:8080/api/user/update", data, {headers: {
      'content-type': 'application/json'
    }})
    .then(res => { 
      setMessage(res.data.message);
      setUsername('');
      setOldPassword('');
      setPassword('');
    })
  };


  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem('user');
    props.setUser(null);
    history.push("/login");
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Admin
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
        <StyledMenuItem title="Change Password or Username" onClick={handleClickOpen}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </StyledMenuItem>
        <Dialog open={open} onClose={handleClickClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
          {message && (message === 'Update Successfully' ? <Alert severity="success">{message}</Alert>
          :<Alert severity="error">{message}</Alert>)}
          <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="User Name"
                type="text"
                value={username}
                onChange={handleChange}

              />
              <TextField
                
                margin="dense"
                id="old_password"
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={handleChange}

              />
              <TextField
                
                margin="dense"
                id="password"
                label="New Password"
                type="password"
                value={password}
                onChange={handleChange}

              />
          </DialogContent>
          <DialogActions>
            <Button size="large"  onClick={handleClickChange} color="primary" >
              <strong>Change</strong>
            </Button>
          </DialogActions>
        </Dialog>



        <StyledMenuItem  title="Delete all the files">
          <ListItemIcon>
            <DeleteSweepIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Clear DATA" />
        </StyledMenuItem>

        <StyledMenuItem title="Log out" onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Exit" />
        </StyledMenuItem>

      </StyledMenu>
    </div>
  );
}