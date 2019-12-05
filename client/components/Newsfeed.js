import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar,
  Box, IconButton, ListItemSecondaryAction, Button, makeStyles, Icon,
  MenuItem
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PropTypes from 'prop-types';
import Enrollment from './Enrollment';
import Router from 'next/router'
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
    backgroundColor: '#504658'
  },
  right_pane: {
    width: '40%',
    // backgroundColor: '#f0decb'
  },
  inline: {
    display: 'inline',
  },
  active: {
    backgroundColor: "primary"
  }
}));

const calulateTimeDiff = (timestamp) => {
  let now = new Date().getTime();
  let diff = now - timestamp;
  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;
  const day = hour * 24;
  const month = 30 * day;
  const year = 12 * month;

  if (diff > year) {
    return Math.floor(diff / year) + " year(s) ago";
  } else if (diff > month) {
    return Math.floor(diff / month) + " month(s) ago";
  } else if (diff > day) {
    return Math.floor(diff / day) + " day(s) ago";
  } else if (diff > hour) {
    return Math.floor(diff / hour) + " hour(s) ago";
  } else if (diff > min) {
    return Math.floor(diff / min) + " minutes(s) ago";
  } else if (diff > 5 * sec) {
    return Math.floor(diff / sec) + " second(s) ago";
  } else {
    return "Few seconds ago";
  }
}

export default function Newsfeed(props) {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);
  const [courseId, setCourse] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  const handleClick = (event, idx, course_id) => {
    setSelectedIndex(idx);
    setCourse(course_id);
  };

  const handleClickMore = (course_id, course_title, term) => {
    Router.push({
      pathname: '/course/details',
      query: {
        course_id: course_id,
        course_title: course_title,
        term: term
      }
    });
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
              key={item.reg_time} 
              alignItems="flex-start" 
              divider={true}
              selected={item.reg_time === selectedIndex}
              onClick={e => handleClick(e, item.reg_time, item.course_id)}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" >
                    {item.course_title.replace(/,/g, ' ').toUpperCase()}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {`Enrolled by ${item.name}`}
                    </Typography>
                    {` ———— ${calulateTimeDiff(item.reg_time)}`}
                  </React.Fragment>
                }
              />  
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="more"
                  onClick={e => handleClickMore(item.course_id, item.course_title.split(','), item.term)}>
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