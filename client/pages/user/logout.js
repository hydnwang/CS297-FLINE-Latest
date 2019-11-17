import Layout from '../../components/default_layout';
import { Container } from '@material-ui/core';

export default () => {
  return (
    <Layout title="Logout">
      <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Sucessfully Logged Out!</h1>
      </Container>
    </Layout>
  );
}