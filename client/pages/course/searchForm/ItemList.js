import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dept from '../../../components/course/depts';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


class DeptBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var partten ='}{';
    var length = this.props.data.length;
    var str = this.props.data;
    var objs=[];
    if(length>0){
        str.substring(1,str.length);
        var courses=str.split(partten);
        courses.forEach(element=>{
            element='{'+'}';
            var obj = JSON.parse(element);
            objs.push(obj);
        })
    }
    return (
      <FormControl 
      fullWidth
      >
          {str}
      </FormControl>
    );
  }
}

export default DeptBar;
