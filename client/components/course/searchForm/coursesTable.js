import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Router from "next/router";
import {
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
    // padding: 100
  },
  inner: {
    minWidth: 800,
    overflowX: 'auto',
    overflowY: 'auto',
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const checkReg=(courses, c_id)=>{
  // courses.forEach(item=>{
  //   console.log("in checkreg:"+parseInt(item));
  // })
  if(courses&&courses.size>0){
    // console.log("in checkreg:"+courses.has(parseInt(c_id)));
    return courses.has(parseInt(c_id))
  }
  else return false;
};

const handleJump =function (event, course_id,course_title,term){
  var title ="";
  course_title.forEach(item=>{
    title=title.concat(item+",");
  })
  console.log("jump："+title);
  Router.push({
    pathname:'/course/details',
    query:{course_id: course_id,
            course_title: course_title,
            term:term,}
  })
};

const coursesTable = props => {
  const { className, users, ...rest } = props;
  const user_id=props.token;
  const term = props.term;
  const classes = useStyles();

  return (
    <div>
      {users&&users.map((user)=>(
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
        <CardContent className={classes.content}>
          <p>{user.name[0]+" "+user.name[1]+" "+user.name[2]}</p>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      ADD
                    </TableCell>
                    <TableCell>ClassCode</TableCell>
                    <TableCell>ClassType</TableCell>
                    <TableCell>SectionCode</TableCell>
                    <TableCell>units</TableCell>
                    <TableCell>Instructors</TableCell>
                    <TableCell>meetings</TableCell>
                    <TableCell>FinalExam</TableCell>
                    <TableCell>maxCapacity</TableCell>
                    <TableCell>currentlyEnrolled</TableCell>
                    <TableCell>status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user&&user.sections.map((section) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={section.classCode}
                    >
                      <TableCell padding="checkbox">
                          <Checkbox
                          color="primary"
                          checked={checkReg(props.courses,section.classCode)}
                          onChange = {event => props.handleSelectOne(event, section.classCode, user.name, section.classType,section.meetings,user_id,term)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <a onClick = {event =>handleJump(event,section.classCode,user.name, term)} >
                          <Typography variant="body1">{section.classCode}</Typography>
                          </a>
                        </div>
                      </TableCell>
                      <TableCell>{section.classType}</TableCell>
                      <TableCell >
                        {section.sectionCode}
                      </TableCell>
                      <TableCell>{section.units}</TableCell>
                      <TableCell>{section.instructors[0]
                      }</TableCell>
                      <TableCell>{section.meetings[0][0]+"\n"+section.meetings[0][1]
                      }</TableCell>
                      <TableCell>{section.finalExam}</TableCell>
                      <TableCell>{section.maxCapacity}</TableCell>
                      <TableCell>
                        {section.numCurrentlyEnrolled[0]}
                      </TableCell>
                      <TableCell>
                        {section.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
        </CardContent>
      </Card>
      ))}
    </div>
  );
};

coursesTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default coursesTable;
