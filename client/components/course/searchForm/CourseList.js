import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Router from "next/router";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
const fetch = require("node-fetch");
import querystring from 'querystring';
const useStyles = makeStyles({
    root: {
        width: '100%',
      },
    tableWrapper: {
        maxHeight: 440,
        overflow: 'auto',
      },
    });

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state={
        selectedIndex:0,
    }
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
    const { classes, ...rest } = this.props;
    
    var course_set = this.props.courseSet;
    var course_list=Array.from(course_set);
    return (
        // <List
        // component="nav"
        // aria-labelledby="nested-list-subheader"
        // className={classes.root}
        // >
        //     {/* {course_set&&course_set.map((course)=>{
        //         return(
        //             <ListItem>{course}</ListItem>
        //         );
        //     }
        //     )} */}

        // </List>
        <Paper style = {{overflowY:'auto'}}>
        <div style = {{maxHeight: 280}}> 
            <table>
                <List component="nav" aria-label="secondary mailbox folder">
                    {course_list.map((course)=>(
                        <ListItem button
                        style={{width: '100%',}}
                        onClick={event => this.handleListItemClick(event, course)}>
                            <ListItemText>{course}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </table>
        </div>
        </Paper>
    );
  }
}

export default (CourseList);
