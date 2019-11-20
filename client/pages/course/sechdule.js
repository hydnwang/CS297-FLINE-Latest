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
          data={[
            { startDate: '2018-11-21 10:00', endDate: '2018-11-21 11:00', title: 'CS 122B' },
            { startDate: '2018-11-22 18:00', endDate: '2018-11-22 19:30', title: 'CS 196' },
          ]}
        >
          <WeekView />
          <Appointments />
        </Scheduler>
      </Container>
    </Layout>
  );
}
