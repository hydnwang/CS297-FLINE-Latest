import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar,
  Box, IconButton, ListItemSecondaryAction, Button, makeStyles, Icon,
  MenuItem
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
import Enrollment from './Enrollment';
const fetch = require("node-fetch");

const discover_api = '/api/friendship/discover-friends-enrollment/';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    width: '100%'
  },
  left_pane: {
    width: '60%',
    borderRight: `5px solid ${theme.palette.divider}`,
    // backgroundColor: theme.palette.background.paper
  },
  right_pane: {
    width: '40%',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline',
  },
  active: {
    backgroundColor: "primary"
  }
}));

function TabPanel(props) {
  const { children, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node
};


export default function Newsfeed(props) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);
  const [courseId, setCourse] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  const handleClick = (event, idx, course_id) => {
    setSelectedIndex(idx);
    setCourse(course_id);
    // console.log("setCourse course_id="+ course_id);
  };

  React.useEffect(() => {
    getItems();
    const interval = setInterval(() => {
      getItems();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  
  const getItems = () => {
    fetch(discover_api + props.uid)
      .then(result => result.json())
      .then(result => setItems(result.data));
  }

  return (
    <div className={classes.root}>
      <List component="nav" className={classes.left_pane}>
        {
          items.map((item, index) =>
            <MenuItem
              button
              key={item.timestamp} 
              alignItems="flex-start" 
              divider={true}
              selected={item.timestamp === selectedIndex}
              onClick={e => handleClick(e, item.timestamp, item.course_id)}
            >
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      color="textPrimary"
                    >
                      {item.course_title.toUpperCase()}
                    </Typography>
                  </React.Fragment>
                }
                secondary={`Enrolled by ${item.name}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more">
                  <MoreHorizIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </MenuItem>
          )
        }
      </List>
      <Enrollment className={classes.right_pane} courseId={courseId} uid={props.uid}/>
    </div>
  );
}