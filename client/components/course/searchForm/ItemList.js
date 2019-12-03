import React, { Component, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import CourseTable from './coursesTable'
const fetch = require("node-fetch");
import querystring from 'querystring';

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
    this.state={
      courses:{},
    }
  }
  
  componentWillMount(){
    const params={
      user_id:this.props.token,
    };
    const url = 'http://localhost:3000/api/schedule?'+ querystring.stringify(params);
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        var rObj = new Set();
        console.log("in getcourse")
        data.forEach(function(obj){
          rObj.add(obj.course_id);
        });
        console.log("rObj.size"+rObj.size);
        this.setState({courses:rObj});
      })
      .catch(e => console.log('错误:', e));
  };
  render() {
    var str = this.props.data;
    // console.log("itemList:"+ str);
    return (
      <FormControl 
      fullWidth
      >
        <CourseTable token = {this.props.token} users={ parseData(str)} term = {this.props.term} courses={this.state.courses}/>
      </FormControl>
    );
  }
}

export default ItemList;
