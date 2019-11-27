import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import { withAuthSync } from '../../../utils/auth';

const useStyles = makeStyles(theme => ({
  root: {
  },
  content: {
    padding: 100
  },
  inner: {
    minWidth: 1050
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

const parseTime=(str)=>{
  var res ="";
  console.log("str:"+str);
  var array=[];
  var i=0;
  if(str.length>3){
    for(;i<str.length;i++){
      if(str.charAt(i)=='M'||str.charAt(i)=='F'||str.charAt(i)=='W'){
        array.push(""+str.charAt(i));
      }else if(str.charAt(i)=='T'){
        var weekday="";
        if(str.charAt(i+1)=='u'){
          weekday="Tu";
          i++;
        }else if(str.charAt(i+1)=='h'){
          weekday="Th";
          i++;
        }
        if(weekday.length>0){
          array.push(weekday);
        }
      }else{
        break;
      }
    }
    var daytime = str.substring(i,str.length);
    daytime = daytime.replace(/\s+/g,"");
    console.log("daytime:"+daytime);

    for(var j=0;j<array.length;j++){
      var temp = array[j];
      temp=temp.concat(" "+ daytime+",");
      console.log("array[j]"+temp);
      res=res.concat(temp);
    }
  }else{
    res=str;
  }
  console.log("parseTime:"+res);
  return res;
};
const handleSelectOne = (event, course_id,course_title,course_type, meeting_time,user_id) => {
  
  if(user_id==undefined) user_id=4;
  var times="";
  meeting_time.forEach(item=>{
    if(item.length ==2){
      times=times.concat(parseTime(item[0])); //item[0] is time, item[1] is classroom
    }
  })
  var title ="";
  course_title.forEach(item=>{
    title=title.concat(item+",");
  })
  if(event.target.checked){
    fetch('/api/registration/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: course_id,
        secondParam: user_id,
        thirdParam: title,
        forthParam: course_type,
        fifthParam: times,
      })
    })
  }else{
    fetch('/api/registration/drop', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: course_id,
        secondParam: user_id,
      })
    })
  }

};

const UsersTable = props => {
  const { className, users, ...rest } = props;
  const user_id=props.token;
  console.log("user_id:"+user_id);
  const classes = useStyles();
  
  return (
    <div>
      {users.map((user)=>(
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
        <CardContent className={classes.content}>
          <p>{user.name[0]+" "+user.name[1]+" "+user.name[2]}</p>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
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
                  {user.sections.map((section) => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={section.classCode}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onChange={event => handleSelectOne(event, section.classCode, user.name, section.classType,section.meetings,user_id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Typography variant="body1">{section.classCode}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{section.classType}</TableCell>
                      <TableCell>{section.sectionCode}</TableCell>
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
          </PerfectScrollbar>
        </CardContent>
      </Card>
      ))}
    </div>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default withAuthSync(UsersTable);
