import React from 'react'
import { withAuthSync } from '../utils/auth';
import Layout from '../components/default_layout';
import { Container } from '@material-ui/core/';

const Main = props => {
  return (
    <Layout title="Main" loginStatus={props.loginStatus}>
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Main Page</h1>
      </Container>
    </Layout>
  );
}

export default withAuthSync(Main)