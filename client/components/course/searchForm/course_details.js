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
            courseList: [],
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
        const params1={
            term: this.state.term,
            department:this.state.course_title[0],
            courseCodes:this.state.code,
        };
        const url1 = '/api/course?'+
        querystring.stringify(params1);
        console.log(url1);
        fetch(url1)
          .then(res => res.json())
          .then(data => {
            this.setState({data:data.apiResponse})})
          .catch(e => console.log('错误:', e)); 

        const params2={
          user_id:this.props.user_id,
        };
        const url2 = 'http://localhost:3000/api/schedule?'+ querystring.stringify(params2);
        console.log(url2);
        fetch(url2)
          .then(res => res.json())
          .then(data => {
            var rObj = new Set();
            // console.log("in getcourse")
            data.forEach(function(obj){
              rObj.add(obj.course_id);
            });
            // console.log("rObj.size"+rObj.size);
            this.setState({courseList:rObj});
          })
          .catch(e => console.log('错误:', e));
    };
    parseTime=(str)=>{
      var res ="";
      // console.log("str:"+str);
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
          }else if(str.charAt(i)=='S'){
            console.log("in S:"+str);
            var weekday="";
            if(str.charAt(i+1)=='a'){
              weekday="Sa";
              i++;
            }else if(str.charAt(i+1)=='u'){
              weekday="Su";
              i++;
            }
            if(weekday.length>0){
              array.push(weekday);
            }}else{
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
    addCourseList=(course_id)=>{
      var course_list = this.state.courseList;
      course_list.add(parseInt(course_id));
      return course_list;
    }
  
    dropCourseList=(course_id)=>{
      var course_list = this.state.courseList;
      course_list.delete(parseInt(course_id));
      return course_list;
    }
    handleselectone = (event,course_id,course_title,course_type, meeting_time,user_id,term) => {
  
      if(user_id==undefined) user_id=0;
      var times="";
      meeting_time.forEach(item=>{
        if(item.length ==2){
          times=times.concat(this.parseTime(item[0])); //item[0] is time, item[1] is classroom
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
            sixthParam: term,
          })
        }).then(this.setState({courseList:this.addCourseList(course_id)}))
        .then(this.setState({status:!this.state.status}))
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
            thirdParam: term,
          })
        }).then(this.setState({courseList:this.dropCourseList(course_id)}))
        .then(this.setState({status:!this.state.status}))
      }
    };
    render(){
        const { classes, ...rest } = this.props;
        console.log("courseList in course_details:");
        console.log(this.state.courseList);
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
                <ItemList token = {this.props.user_id} data = {this.state.data} term = {this.state.term} handleselectone = {this.handleselectone} courses={this.state.courseList}/>
              </CardContent>
            </Card>
            </div>
          );
    }
};
export default withStyles(useStyles)(CourseDetails);
