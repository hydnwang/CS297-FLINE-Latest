import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Paper, Typography } from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';


export default () => {
  return (
    <Layout title="Schedule">
      <Container maxWidth="12" style={{ flex: 1 }}>
        <h1>Schedule</h1>
        <Scheduler
          startDayHour={8}
          endDayHour={20}
        >
          <WeekView />
          <Appointments />
        </Scheduler>
      </Container>
    </Layout>
  );
}
