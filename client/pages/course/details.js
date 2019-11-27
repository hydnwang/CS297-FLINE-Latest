import React from 'react'
import querystring from 'querystring';
import { withAuthSync } from '../../utils/auth';
const fetch = require("node-fetch");
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Enrollment from '../../components/Enrollment'
import CourseDetails from './searchForm/course_details';
import {withRouter} from 'next/router'

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
          course_id: this.props.router.query.course_id,
          course_title: this.props.router.query.course_title,
        };
      }

    render(){
        return (
            <div >
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
                  <CourseDetails />
                </Grid>
                <Grid
                  item
                  lg={8}
                  md={6}
                  xl={8}
                  xs={12}
                >
                  <Enrollment courseId={this.state.course_id} uid={this.state.user_id}/>
                </Grid>
              </Grid>
            </div>
          );
    }
  
};

export default withRouter(withAuthSync(Details));
