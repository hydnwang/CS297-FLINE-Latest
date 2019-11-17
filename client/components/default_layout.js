import React from 'react';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, createMuiTheme, CssBaseline, Box } from '@material-ui/core';
import Nav from './nav';
import Footer from './footer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }, 
  footer: {
    padding: theme.spacing(2),
  },
}));

export default ({ children, title='' }) => {
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
        <Nav />
        {children}
        <Footer />
    </Box>
    </ThemeProvider>
  );
}