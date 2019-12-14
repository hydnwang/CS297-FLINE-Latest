import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Grid, ListItem, ListItemAvatar, Button,
  Avatar, ListItemText, Typography, makeStyles, Paper, Link
} from '@material-ui/core/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withAuthSync } from '../../utils/auth';
import background from '../../public/images/friends.png';

const get_friends_api = '/api/friendship/get-friends/';
const get_requests_api = '/api/friendship/get-requests/';
const accept_request_api = '/api/friendship/accept-friend/';


const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(2, 0, 2), 
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  userName: {
    color: '#FFFFFF'
  },
  avatar: {
    width: 'inherit',
    height: 'inherit'
  },
}));

const Friends = props => {
  const classes = useStyles();
  const uid = props.token;
  const [friends, setFriends] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const thumbs = <Avatar>
    <AccountCircleIcon className={classes.avatar}/>
  </Avatar>;

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
    <Layout title="Friends" loginStatus={props.loginStatus} background={background}>
      <Container maxWidth="md" style={{ flex: 1 }}>
        <h1>Friends</h1>
        <Grid container spacing={3}>
          {
            requests.map((users) =>
              <Grid item xs={4} key={users.id}>
                <Paper className={classes.paper}>
                  <ListItem>
                    <ListItemAvatar>
                      { users.thumbnail? (<Avatar src={users.thumbnail} />): thumbs }
                    </ListItemAvatar>
                    <ListItemText
                      primary={users.name}
                      secondary="Pending"
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
              <Grid item xs={4} key={users.id}>
                <Paper className={classes.paper}>
                  <ListItem>
                    <ListItemAvatar>
                      { users.thumbnail? (<Avatar src={users.thumbnail} />): thumbs }
                    </ListItemAvatar>
                    <ListItemText
                      primary={ users.status == 'friend'?
                        (<Typography style={{ color: '#FFFFFF' }}>
                          <Link href={`/course/schedule?u_id=${users.id}`}>
                            {users.name}
                          </Link>
                        </Typography>): users.name
                      }
                      secondary={users.status == 'friend'? ('Friend'): ('Request has been sent')}
                    />
                  </ListItem>
                </Paper>
              </Grid>
            )
          }
        </Grid>
        <p></p>
        {`Want more friends? `}
        <Link href="/course/index" variant="body2">
          {"Find friends from courses"}
        </Link>
      </Container>
    </Layout>
  );
}

export default withAuthSync(Friends)