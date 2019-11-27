import React from 'react'
import { withAuthSync } from '../utils/auth';
import Layout from '../components/default_layout';
import { Container } from '@material-ui/core/';
import Newsfeed from "../components/Newsfeed.js"

const Main = props => {
  return (
    <Layout title="Main" loginStatus={props.loginStatus}>
      <Container maxWidth="md" style={{ flex: 1 }}>
        <h1>Discover something</h1>
        <Newsfeed />
      </Container>
    </Layout>
  );
}

export default withAuthSync(Main)