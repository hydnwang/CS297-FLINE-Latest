import React from 'react';
import Layout from '../../components/default_layout';
import {
  Container, TextField, FormControl, IconButton, Button,
  InputLabel, OutlinedInput, InputAdornment, Typography, Link, Avatar, Grid
} from '@material-ui/core/';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import MajorList from '../../components/user/major_list';
import InterestList from '../../components/user/interest_list';
import ButtonLink from '../../components/button_link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  form: {
    marginBottom: 150, 
  },
  avatarContainer: {
    width: 100,
    height: 100, 
  },
  avatar: {
    width: 110, 
    height: 110, 
  }, 
  textField: {
    marginBottom: theme.spacing(2),
  },
  password: {
    margin: theme.spacing(1.5, 0, 1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
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
      <Grid container justify="center" alignItems="center">
      <Avatar className={classes.avatarContainer}>
        <AccountCircleIcon className={classes.avatar} />
      </Avatar>
      </Grid>
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
        defaultValue={MajorList[3]}
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
        defaultValue={[InterestList[0], InterestList[20], InterestList[30]]}
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
      <Button 
        fullWidth
        variant="outlined"
        component={ButtonLink} 
        className={classes.link} 
        href={'/'}>
        Cancel
      </Button>
    </form>
  );
}

const Signup = props => {
  return (
    <Layout title="Profile Settings">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Profile Settings</h1>
        <FormComponent />
      </Container>
    </Layout>
  );
}

export default Signup
