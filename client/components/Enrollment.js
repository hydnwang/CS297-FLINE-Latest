import React from 'react';
import {
  List, ListItem, ListItemText, ListItemAvatar, Typography, Avatar,
  Box, IconButton, ListItemSecondaryAction, Button, makeStyles, Icon,
  MenuItem
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SendIcon from '@material-ui/icons/Send';
import PropTypes from 'prop-types';
const fetch = require("node-fetch");

const sendRequest_api = '/api/friendship/request-friend';
const enrollment_api = '/api/friendship/enrollment/';

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


export default function Enrollment(props) {
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    // console.log("useEffect");
    getEnrollment(props.courseId);
    const interval = setInterval(() => {
      getEnrollment(props.courseId);
    }, 3000);

    return () => clearInterval(interval);
  }, [props.courseId]);

  const getEnrollment = (courseId) => {
    // console.log('getEnrollment course id=' + courseId);
    fetch(enrollment_api + courseId)
      .then(result => result.json())
      .then(result => setStudents(result.data));
  }

  const sendFriendRequest = (to_id) => {
    fetch(sendRequest_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "from": props.uid, "to": to_id })
    }).then(() => getEnrollment(props.courseId));
  }
  
  const handleClick = (event, to_id) => {
    sendFriendRequest(to_id);
  };


  return (
    <TabPanel style={{backgroundColor: '#f0decb'}}>
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
                  <IconButton edge="end" aria-label="more" onClick={e => handleClick(e, student.id)}>
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
  );
}