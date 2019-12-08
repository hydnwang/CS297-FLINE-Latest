import React, { Component, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CourseTable from './coursesTable'

function parseData(str){
    var objs=[];
    if(str && str.length>0){
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
        <CourseTable token = {this.props.token} users={ parseData(str)} term = {this.props.term} courses={this.props.courses} handleSelectOne = {this.props.handleSelectOne}/>
      </FormControl>
    );
  }
}

export default ItemList;
