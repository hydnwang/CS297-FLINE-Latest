import React, {Component} from 'react';
import Router from "next/router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
const fetch = require("node-fetch");
import querystring from 'querystring';

class CourseList extends Component {
  constructor(props) {
    super(props);
  }
  handleListItemClick = (event, course_id) => {
    const params={
        course_id:course_id,
        user_id: this.props.token,
      };
      const url = 'http://localhost:3000/api/registration?'+ querystring.stringify(params);
      console.log(url);
      fetch(url)
        .then(res => res.json())
        .then(data => {
            var course_list = data[0].course_title.substring(0, data[0].course_title.length-1).split(',');
            Router.push({
                pathname:'/course/details',
                query:{ course_id: course_id,
                        course_title: course_list,
                        term:data[0].term,
                    }
              });
        })
        .catch(e => console.log('错误:', e));
  };
  render() {
    
    var course_set = this.props.courseSet;
    var course_list=Array.from(course_set);
    return (
        <Paper style = {{overflowY:'auto'}}>
        <div style = {{maxHeight: 280}}> 
          <List>
              {course_list.map((course,i)=>(
                  <ListItem button
                  key={i}
                  style={{width: '100%',}}
                  onClick={event => this.handleListItemClick(event, course)}>
                      <ListItemText>{course}</ListItemText>
                  </ListItem>
              ))}
          </List>
        </div>
        </Paper>
    );
  }
}

export default CourseList;
