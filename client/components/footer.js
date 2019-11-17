import { Typography, Link, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">FLINE</Link>
      {' '}{new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  footer: {
    alignContent: 'center', 
    padding: theme.spacing(2), 
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <footer>
      <Paper className={classes.footer}>
        <Copyright />
      </Paper>
    </footer>
  );
}