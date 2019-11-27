import React from 'react'
import Layout from '../../components/default_layout';
import { Container, Paper, Typography } from '@material-ui/core/';
import BuildIcon from '@material-ui/icons/Build';
import { Scheduler, WeekView,Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import querystring from 'querystring';
import { withAuthSync } from '../../utils/auth';
const fetch = require("node-fetch");
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class Details extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          user_id: this.props.token,
          currentDate: new Date('2019-11-27'),
        };
      }

    render(){
        return (
            <div className={classes.root}>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  lg={4}
                  md={6}
                  xl={4}
                  xs={12}
                >
                  <AccountProfile />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xl={8}
                  xs={12}
                >
                  <Enrollment courseId={courseId} uid={this.state.user_id}/>
                </Grid>
              </Grid>
            </div>
          );
    }
  
};

export default withAuthSync(Details);
