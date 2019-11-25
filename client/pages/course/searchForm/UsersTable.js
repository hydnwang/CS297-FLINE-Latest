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

const UsersTable = props => {
  const { className, users, ...rest } = props;
  
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
                          // onChange={event => handleSelectOne(event, section.classCode)}
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

export default UsersTable;
