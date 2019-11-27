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
const fetch = require("node-fetch");

const discover_api = '/api/friendship/discover-friends-enrollment/1';
const enrollment_api = '/api/friendship/enrollment/';
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
      // hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired
};


export default function Newsfeed() {
  const classes = useStyles();
  const [items, setItems] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  const handleClick = (event, id) => {
    getEnrollment(id);
    setSelectedIndex(id);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getItems()
    }, 3000);

    return () => clearInterval(interval);
  });
  
  const getItems = () => {
    fetch(discover_api)
      .then(result => result.json())
      .then(result => setItems(result.data));
  }

  const getEnrollment = (course_id) => {
    fetch(enrollment_api + course_id)
      .then(result => result.json())
      .then(result => setStudents(result.data));
  }

  return (
    <div className={classes.root}>
      <List component="nav" className={classes.left_pane}>
        {
          items.map((item, index) =>
            <MenuItem
              button
              key={item.course_id} 
              alignItems="flex-start" 
              divider={true}
              selected={index === selectedIndex}
              onClick={e => handleClick(e, item.course_id)}
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
      <TabPanel index='0' className={classes.right_pane}>
        <h2>Student List</h2>
        <List>
          {
            students.map((student) =>
              <ListItem key={student.name}>
                <ListItemAvatar>
                  <Avatar src="../../public/images/avatar.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={student.name}
                  secondary={student.status != 'friend'? (`${student.degree} degrees`): ('Friend')}
                />
                <ListItemSecondaryAction>
                  {student.status == ""? (
                    <IconButton edge="end" aria-label="more">
                      <PersonAddIcon />
                    </IconButton>
                  ): (student.status == 'pending'? (
                    <IconButton edge="end" disabled="true" aria-label="more">
                      <SendIcon />
                    </IconButton>
                  ):(<p/>))
                  }
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </TabPanel>
    </div>
  );
}