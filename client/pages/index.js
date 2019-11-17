import React from 'react'
import Layout from '../components/default_layout';
import { Container } from '@material-ui/core/';

export default () => {
  return (
    <Layout title="Main">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Main Page</h1>
      </Container>
    </Layout>
  );
}
