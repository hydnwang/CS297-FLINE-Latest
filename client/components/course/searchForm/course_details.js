import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import course_info from './course_info.json';
import ItemList from'./ItemList'
const fetch = require("node-fetch");
import querystring from 'querystring';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

class CourseDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            code: this.props.course_id,
            course_title: this.props.course_title,
            user: this.props.user_id,
            term: this.props.term,
            data:"",
        };
    }
    courseInfo = () => {
        let a = undefined;
        try {
          a =
            course_info[this.props.course_title[0]][
              this.props.course_title[1]
            ];
            // console.log(a);
        } catch (err) {}
    
        return a;
      };

    componentWillMount(){
        const params={
            term: this.state.term,
            department:this.state.course_title[0],
            courseCodes:this.state.code,
        };
        const url = '/api/course?'+
        querystring.stringify(params);
        console.log(url);
        fetch(url)
          .then(res => res.json())
          .then(data => {
            this.setState({data:data.apiResponse})})
          .catch(e => console.log('错误:', e)); 
    };
    render(){
        const { classes, ...rest } = this.props;
        return (
          <div>
            <Card
              {...rest}
            >
              <CardContent>
                <div className={classes.details}>
                  <div
                    style={{ margin: 20 }}
                    className="course_info"
                    dangerouslySetInnerHTML={{
                      __html: this.courseInfo(),
                    }}
                  />
                </div>
                <ItemList token = {this.props.user_id} data = {this.state.data}/>
              </CardContent>
            </Card>
            </div>
          );
    }
};
export default withStyles(useStyles)(CourseDetails);
