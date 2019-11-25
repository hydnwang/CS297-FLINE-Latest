import React, { Component, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dept from '../../../components/course/depts';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import CourseTable from './UsersTable'
const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3),
      marginLeft:100,
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

function parseData(str){
    var objs=[];
    if(str.length>0){
      var temp = str.substring(1,str.length-1);
    // console.log("temp:"+temp);
    var courses=temp.split("}{");
    courses.forEach(element=>{
        element='{'+element+'}';
        // console.log("element:"+element);
        var obj = JSON.parse(element);
        objs.push(obj);
    })
    }
    return objs;
}

class ItemList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var str = this.props.data;
    return (
      <FormControl 
      fullWidth
      >
        <CourseTable users={ parseData(str)} />
        {/* {str} */}
      </FormControl>
    );
  }
}

export default ItemList;
