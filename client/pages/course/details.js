import React from 'react'
import querystring from 'querystring';
import { withAuthSync } from '../../utils/auth';
const fetch = require("node-fetch");
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Enrollment from '../../components/Enrollment'
import CourseDetails from '../../components/course/searchForm/course_details';
import Layout from '../../components/default_layout';
import { withRouter } from 'next/router';
import background from '../../public/images/pets.jpg';

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
          term:this.props.router.query.term,
        };
      }

    render(){
        return (
          <Layout loginStatus={this.props.loginStatus} >
            <div style={{backgroundImage: `url(${background})`}}>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  // lg={8}
                  // md={6}
                  // xl={4}
                  // xs={12}
                >
                  <CourseDetails course_id = {this.state.course_id} course_title = {this.state.course_title} user_id = {this.state.user_id} term = {this.state.term}/>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  // lg={4}
                  // md={6}
                  // xl={8}
                  // xs={12}
                >
                  <Enrollment courseId={this.state.course_id} uid={this.state.user_id}/>
                </Grid>
              </Grid>
            </div>
          </Layout>
        );
    }
  
};

export default withAuthSync(withRouter(Details));
