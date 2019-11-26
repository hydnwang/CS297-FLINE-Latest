// Libraries
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { login, withAuthSync } from '../../utils/auth';

// Styles
import { 
  Container, TextField, FormControl, IconButton, 
  Button, Grid, InputLabel, OutlinedInput, InputAdornment, 
  Typography, Link, SnackbarContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Layout from '../../components/default_layout';
const useStyles = makeStyles(theme => ({
  form: {},
  textField: {
    margin: theme.spacing(1, 0, 2), 
  }, 
  submit: {
    margin: theme.spacing(2, 0, 2), 
  },
  errorBar: {
    backgroundColor: theme.palette.error.dark, 
  }
}));

// Components
function FormComponent() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '', 
    password: '',
    error: '', 
    usernameErr: '',
    passwordErr: '', 
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
    const { username, password } = values;
    if (!username || !password) {
      // setValues( Object.assign({}, values, {error: 'Missing Information'})) 
      if (!username) {setValues(prev=>({...prev,usernameErr:'Please enter email'}))}
      if (!password) {setValues(prev=>({...prev,passwordErr:'Please enter password'}))}
      return
    }
    
    const loginURL = '/api/users/login';
    try {
      const res = await fetch(loginURL, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ username, password })
      })
      if (res.status == 200) {
        const { userId } = await res.json()
        await login({ token: userId })
      } else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
      }
    } catch (error) {
      const { response } = error
      setValues( Object.assign({}, values, { 
        error: response ? response.statusText : error.message,
      }))
    }
  };

  return (
    <form className={classes.form} noValidate autoComplete="off">
      {values.error &&
        <SnackbarContent
          className={classes.errorBar}
          message={`Error: ${values.error}`}
        />}
      {values.usernameErr &&
        <SnackbarContent
          className={classes.errorBar}
          message={`Error: ${values.usernameErr}`}
        />}
      <TextField
        id="email"
        margin="normal"
        fullWidth
        required
        label="Email"
        variant="outlined"
        helperText="Your email will be your login account"
        className={classes.textField}
        value={values.username}
        onChange={handleChange('username')}
      />
      {values.passwordErr &&
        <SnackbarContent
          className={classes.errorBar}
          message={`Error: ${values.passwordErr}`}
        />}
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

// Main
 const Login = props => {
  return (
    <Layout title="Login" loginStatus={props.loginStatus}>
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>User Login</h1>
        <FormComponent />
      </Container>
    </Layout>
  );
}

export default withAuthSync(Login)
