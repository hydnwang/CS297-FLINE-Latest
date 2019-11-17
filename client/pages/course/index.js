import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Paper, Typography } from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';

export default () => {
  return (
    <Layout title="Course">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Course</h1>
        <Paper style={{padding: "8px 8px",}} square={true} elevation={2}>
          <Typography component="p">
            <BuildIcon /> This site is under construction.
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
}
