import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Paper, Typography } from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';
import { Scheduler, WeekView,Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import querystring from 'querystring';
const fetch = require("node-fetch");

const Appointment = ({
  children, style, ...restProps
}) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: '#FFC107',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default () => {
    const params={
      user_id:101
    };
    const url = 'http://localhost:3000/api/schedule?'+ querystring.stringify(params);
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("****************");
        return data;
      })
      .catch(e => console.log('错误:', e));
  
  return (
    <Layout title="Schedule">
      <Container maxWidth="12" style={{ flex: 1 }}>
        <h1>Schedule</h1>
        <Scheduler
        >
          <WeekView
            startDayHour={8}
            endDayHour={20}
          />
          <Appointments />
        </Scheduler>
      </Container>
    </Layout>
  );
}
