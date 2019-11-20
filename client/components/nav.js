import { AppBar, Toolbar, Link, Typography, Button, Box, Menu, MenuItem, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import ButtonLink from '../components/button_link';

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 0.5),
  }, 
  icon: {
    marginRight: theme.spacing(0.5), 
  },
}));

export default ({ loginStatus='Login' }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
    <Box display={{ xs: 'none', md: 'block' }} m={1}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            <Link href='/' color="textPrimary" underline="none">
              FLINE
            </Link>
          </Typography>
          <nav>
            {/* <Button href="#" className={classes.link}>
              <GroupIcon className={classes.icon} /> Friends
            </Button> */}
            <Button component={ButtonLink} className={classes.link} href={'/friend/index'}>
              <GroupIcon className={classes.icon} /> Friends
            </Button>
            <Button component={ButtonLink} className={classes.link} href={'/course/index'}>
              <SchoolIcon className={classes.icon} /> Courses
            </Button>
            <Button component={ButtonLink} className={classes.link} href={'/course/sechdule'}>
              <EventIcon className={classes.icon} /> Sechdule
            </Button>
            <Button component={ButtonLink} className={classes.link} href={'/user/profile'}>
              <PersonIcon className={classes.icon} /> Profile
            </Button>
          </nav>
          <Button component={ButtonLink} variant="outlined" className={classes.link} href={'/user/login'}>
            <ExitToAppIcon className={classes.icon} /> {loginStatus}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Box display={{ xs: 'block', md: 'none' }} m={1}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.title}>
            <Link href='/' color="textPrimary" underline="none">
              FLINE
            </Link>
          </Typography>
          <Button aria-controls="simple-menu" variant="outlined" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon className={classes.icon} />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Button component={ButtonLink} className={classes.link} href={'/friend/index'}>
                <GroupIcon className={classes.icon} /> Friends
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button component={ButtonLink} className={classes.link} href={'/course/index'}>
                <SchoolIcon className={classes.icon} /> Courses
              </Button>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Button component={ButtonLink} className={classes.link} href={'/user/profile'}>
                <PersonIcon className={classes.icon} /> Profile
              </Button>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <Button component={ButtonLink} variant="outlined" className={classes.link} href={'/user/login'}>
                <ExitToAppIcon className={classes.icon} /> {loginStatus}
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
    </Box>
  );
}