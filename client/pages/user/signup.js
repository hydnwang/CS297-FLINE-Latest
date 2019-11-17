import React from 'react';
import Layout from '../../components/default_layout';
import {
  Container, TextField, FormControl, IconButton, Button,
  Grid, InputLabel, OutlinedInput, InputAdornment, Typography, Link
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import MajorList from '../../components/user/major_list';
import InterestList from '../../components/user/interest_list';

const useStyles = makeStyles(theme => ({
  form: {
    marginBottom: 150, 
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  password: {
    margin: theme.spacing(1.5, 0, 1), 
  }, 
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

function FormComponent() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
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
  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField
        id="name"
        margin="normal"
        fullWidth
        label="Name"
        variant="outlined"
        // className={classes.textField}
      />
      <TextField
        id="email"
        margin="normal"
        fullWidth
        required
        label="Email"
        variant="outlined"
        helperText="Your email will be your login account"
        // className={classes.textField}
      />
      <FormControl 
        required 
        fullWidth 
        className={classes.password} 
        variant="outlined">
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
      <Autocomplete
        options={MajorList}
        getOptionLabel={option => option.value}
        renderInput={params => (
          <TextField {...params} 
          variant="outlined" 
          label="Major" 
          margin="normal"
          fullWidth 
          />
        )}
      />
      <Autocomplete
        multiple
        options={InterestList}
        getOptionLabel={option => option.value}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Interests"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}>
        Sign Up
      </Button>
      <Grid container spacing={1}>
        <Grid item xs>
          <Typography variant="body1">
            {' '}
          </Typography>
        </Grid>
        <Grid item>
          {'Already had an account? '}
          <Link href="/user/login" color="inherit" variant="body2">
            {"Log In"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

const Signup = props => {
  return (
    <Layout title="Signup">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>User Signup</h1>
        <FormComponent />
      </Container>
    </Layout>
  );
}

export default Signup
