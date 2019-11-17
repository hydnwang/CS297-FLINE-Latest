import React from 'react';
import Layout from '../../components/default_layout';
import { 
  Container, TextField, FormControl, IconButton, Button, 
  Grid, InputLabel, OutlinedInput, InputAdornment, Typography, Link
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  form: {},
  textField: {
    marginBottom: theme.spacing(2), 
  }, 
  submit: {
    margin: theme.spacing(2, 0, 2), 
  },
}));

function FormComponent() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '', 
    password: '',
    showPassword: false,
  });
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleSubmit = async event => {
    event.preventDefault()
    console.log("email: " + values.email);
    console.log("password: " + values.password);
  };
  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="email"
        margin="normal"
        fullWidth
        required
        label="Email"
        variant="outlined"
        helperText="Your email will be your login account"
        className={classes.textField}
        onChange={handleChange('email')}
      />
      <FormControl required fullWidth className={classes.textField} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={80}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleSubmit}
        >
        Log In
      </Button>
      <Grid container spacing={1}>
        <Grid item xs>
          <Typography variant="body1">
            <Link href="#" color="inherit" variant="body2">
              Forgot password?
            </Link>
          </Typography>
        </Grid>
        <Grid item>
          {'Don\'t have an account? '}
          <Link href="/user/signup" color="inherit" variant="body2">
            {"Sign up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

 const Login = props => {
  return (
    <Layout title="Login">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>User Login</h1>
        <FormComponent />
      </Container>
    </Layout>
  );
}

export default Login