import React from 'react'
import { withAuthSync } from '../../utils/auth';
import { Grid } from '@material-ui/core';
import Enrollment from '../../components/Enrollment'
import CourseDetails from '../../components/course/searchForm/course_details';
import Layout from '../../components/default_layout';
import { withRouter } from 'next/router';
import background from '../../public/images/pets.jpg';

class Details extends React.PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          user_id: this.props.token,
          course_id: this.props.router.query.course_id,
          course_title: this.props.router.query.course_title,
          term:this.props.router.query.term,
        };
        console.log(this.state.course_title);
      }

    render(){
      const { classes, ...rest } = this.props;
        return (
          <Layout loginStatus={this.props.loginStatus} >
            <div style={{backgroundImage: `url(${background})`}}>
              <Grid
                container
              >
                <Grid
                  item
                  xs={8}
                >
                  <CourseDetails course_id = {this.state.course_id} course_title = {this.state.course_title} user_id = {this.state.user_id} term = {this.state.term}/>
                </Grid>
                <Grid
                  item
                  xs={4}
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
