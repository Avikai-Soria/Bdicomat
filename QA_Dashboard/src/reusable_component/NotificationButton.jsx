import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function NotificationButton({ notifications }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleNotImplemented = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleNotImplemented}>
        <NotificationsOutlinedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          {notifications.map((notification) => (
            <ListItem button key={notification.id}>
              <ListItemText primary={notification.details} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

export default NotificationButton;
