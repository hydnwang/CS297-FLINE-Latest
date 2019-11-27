// Libraries
import React from 'react';
import fetch from 'isomorphic-unfetch';
import { loginDir, withAuthSync } from '../../utils/auth';

// Styles
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

// Components
function FormComponent() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    realname: '',
    username: '',
    password: '',
    major: '',
    interests: [],
    error: '',
    usernameErr: '',
    passwordErr: '',
    showPassword: false, 
  });
  const handleChange = prop => (event, val) => {
    // setValues({ ...values, [prop]: event.target.value });
    let v
    if (prop === 'major') {
      v = (val) ? val.value : ''
    } else if (prop === 'interests') {
      v = val.map(x => x.value)
    } else {
      v = event.target.value
    }
    setValues({ ...values, [prop]: v });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const handleSubmit = async event => {
    event.preventDefault()
    const URL = '/api/users/create';
    const protocol = 'http'
    const apiUrl = process.browser
      ? `${protocol}://${window.location.host}${URL}`
      : `${protocol}://${ctx.req.headers.host}${URL}`;
    const payload = {
      realname: values.realname,
      username: values.username,
      password: values.password,
      major: values.major,
      interests: values.interests
    }
    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (res.status == 200) {
        const data = await res.json()
        const { userId } = data
        await loginDir({ token: userId, path: '/' })
      } else {
        let err = new Error(res.statusText)
        err.response = res
        throw err
      }
    } catch (error) {
      const { response } = error
      setValues(Object.assign({}, values, {
        error: response ? response.statusText : error.message,
      }))
    }
  };
  return (
    <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="name"
        margin="normal"
        fullWidth
        label="Name"
        variant="outlined"
        onChange={handleChange('realname')}
      />
      <TextField
        id="email"
        margin="normal"
        fullWidth
        required
        label="Email"
        variant="outlined"
        helperText="Your email will be your login account"
        onChange={handleChange('username')}
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
        onChange={handleChange('major')}
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
        onChange={handleChange('interests')}
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
        className={classes.submit}
        >
        Create
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
    <Layout title="Signup" loginStatus={props.loginStatus}>
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>User Signup</h1>
        <FormComponent />
      </Container>
    </Layout>
  );
}

export default withAuthSync(Signup)
