import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Grid, ListItem, ListItemAvatar, Button,
  Avatar, ListItemText, Typography, makeStyles, Paper
} from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';
import { withAuthSync } from '../../utils/auth';

const get_friends_api = '/api/friendship/get-friends/';
const get_requests_api = '/api/friendship/get-requests/';
const accept_request_api = '/api/friendship/accept-friend/';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(2, 0, 2), 
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

const Friends = props => {
  const classes = useStyles();
  const uid = props.token;
  const [friends, setFriends] = React.useState([]);
  const [requests, setRequests] = React.useState([]);

  React.useEffect(() => {
    getFriends();
    getRequests();
    const interval = setInterval(() => {
      getFriends();
      getRequests();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getFriends = () => {
    fetch(get_friends_api + uid)
      .then(result => result.json())
      .then(result => setFriends(result.data.frd_list.concat(result.data.pending_list)));
  }

  const getRequests = () => {
    fetch(get_requests_api + uid)
      .then(result => result.json())
      .then(result => setRequests(result.data));
  }

  const acceptFriendRequest = (from_id) => {
    fetch(accept_request_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "from": from_id, "to": uid })
    }).then(() => getFriends());
  }

  const handleRequest = (event, from) => {
    acceptFriendRequest(from);
  }

  return (
    <Layout title="Friends" loginStatus={props.loginStatus}>
      <Container maxWidth="md" style={{ flex: 1 }}>
        <h1>Friends</h1>
        <Grid container spacing={3}>
          {
            requests.map((users) =>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <ListItem key={users.name}>
                    <ListItemAvatar>
                      <Avatar src="../../public/images/avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={users.name}
                      secondary='Pending'
                    />
                  </ListItem>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={e => handleRequest(e, users.id)}
                  >
                    Accept Friend Request
                  </Button>
                </Paper>
              </Grid>
            )
          }
          {
            friends.map((users) =>
              <Grid item xs={4}>
                <Paper className={classes.paper}>
                  <ListItem key={users.name}>
                    <ListItemAvatar>
                      <Avatar src="../../public/images/avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={users.name}
                      secondary={users.status != 'friend'? ('Request has sent'): ('Friend')}
                    />
                  </ListItem>
                </Paper>
              </Grid>
            )
          }
        </Grid>
      </Container>
    </Layout>
  );
}

export default withAuthSync(Friends)