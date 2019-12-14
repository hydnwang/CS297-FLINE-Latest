// Libraries
import React from 'react';

// Styles
import Head from 'next/head';
import Nav from './nav';
import Footer from './footer';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, createMuiTheme, CssBaseline, Box,
  Card, CardContent, CardMedia
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }, 
  footer: {
    padding: theme.spacing(2),
  },
  banner: {
    height: '300px',
  },
  noBanner: {
    height: 'auto',
  },
}));

const Layout = ({ title, loginStatus, children, background }) => {
  const subtitle = (title !== '' && title !== undefined) ? ' | ' + title : '';
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const default_theme = React.useMemo(() => createMuiTheme({
    palette: { type: prefersDarkMode ? 'dark' : 'light', },
  }),
    [prefersDarkMode],
  );
  const classes = useStyles();

  return (
    <ThemeProvider theme={default_theme}>
      <CssBaseline />
      <Box className={classes.root}>
        <Head>
          <title>FLINE{subtitle}</title>
        </Head>
        <Nav loginStatus={loginStatus} currentPage={title}/>
        <Card>
          <CardMedia
            className={background? classes.banner: classes.noBanner}
            image={background}
          />
          <CardContent>
            {children}
          </CardContent>
        </Card>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default Layout
