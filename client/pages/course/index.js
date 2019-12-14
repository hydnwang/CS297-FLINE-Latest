import React ,{Component} from 'react';
import Layout from '../../components/default_layout';
import { Container } from '@material-ui/core/';
import GESelector from '../../components/course/searchForm/GESelector';
import CourseCodeSearchBar from '../../components/course/searchForm/CourseCodeSearchBar';
import TermSelector from '../../components/course/searchForm/TermSelector';
import Grid from '@material-ui/core/Grid';
import { Button} from '@material-ui/core';
import querystring from 'querystring';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
const fetch = require("node-fetch");
import DeptBar from '../../components/course/searchForm/DeptBar';
import ItemList from '../../components/course/searchForm/ItemList';
import { withAuthSync } from '../../utils/auth';
import background from '../../public/images/books.jpg';
import CourseList from '../../components/course/searchForm/CourseList'
import { userInfo } from 'os';

// const useStyles = makeStyles(theme => ({
//   container: {
//     flexWrap: 'wrap',
//   },
//   textField: {
//     marginLeft: theme.spacing(1),
//     marginRight: theme.spacing(1),
//     width: 400,
//   },
//   menu: {
//     width: 200,
//   },
// }));

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      dept: 'ALL',
      ge: 'ANY',
      term: '2020-Winter',
      courseNum: '',
      courseCode: '',
      instructor: '',
      units: '',
      endTime: '',
      startTime: '',
      coursesFull: 'ANY',
      building: '',
      apiResponse:"",
      courseList: [],
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state !== nextState;
  };

  setDept = (dept) => {
    this.setState({ dept: dept });
    console.log("setDept: "+ dept);
  };

  setGE = (ge) => {
    this.setState({ ge: ge });
  };

  setTerm = (term) => {
    this.setState({ term: term });
  };

  setCode = (code) =>{
    this.setState({courseCode:code});
  };

  handleClick({ target }){
    console.log(this.state.dept);
    const params={
      term:this.state.term,
      department:this.state.dept,
      GE:this.state.ge,
      courseCodes:this.state.courseCode,
    };
    const url = '/api/course?'+
    querystring.stringify(params);
    // alert(querystring.stringify(params));
    console.log(url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        this.setState({apiResponse: data.apiResponse})
      })
      .catch(e => console.log('错误:', e));
    // console.log(this.state.apiResponse);
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

  render() {
    const { classes } = this.props;
    console.log("courseList:"+this.state.courseList);
    return (
      <Layout title='Course' loginStatus={this.props.loginStatus} background={background}>
        <Container maxwidth='lg' >
        <Grid container spacing={8}>
          <Grid item >
          <h1>Course Search</h1>
            <div >
              <Grid container
                direction="row"
                alignItems="center"
                spacing={2}
                maxwidth="sm" >
                <Grid item xs={12}>
                  <TermSelector term={this.state.term} setTerm={this.setTerm} />
                </Grid>
                <Grid item xs={12}>
                  <DeptBar dept={this.state.dept} setDept={this.setDept} />
                </Grid>
              </Grid>
              <Grid container
                direction="row"
                alignItems="center"
                spacing={2}
                maxwidth="sm" 
                >
                <Grid item xs={12}>
                  <GESelector ge={this.state.ge} setGE={this.setGE}  />
                  </Grid>
                <Grid item xs={12}>
                  <CourseCodeSearchBar courseCode={this.state} setCode={this.setCode} />
                </Grid>
              
                <Grid item xs={12}>
                <Button
                onClick = {this.handleClick}
                style={{ backgroundColor: '#72a9ed'}}
                >
                  Search
                </Button>
                </Grid>
              </Grid>
          </div>
          </Grid>
          <Grid item  style={{overflow: 'auto'}, {maxHeight: 200}}>
            <h1>My Courses:</h1>
            <CourseList token = {this.props.token} courseSet = {this.state.courseList}></CourseList>
          </Grid>
        </Grid>
        </Container>
        {this.state.apiResponse!=""?(<ItemList token = {this.props.token} data = {this.state.apiResponse} term ={this.state.term} courses = {this.state.courseList} handleselectone = {this.handleselectone.bind(this)}></ItemList>):(<div/>)}
        {/* <ItemList token = {this.props.token} data = {this.state.apiResponse} term ={this.state.term} courses = {this.state.courseList} handleselectone = {this.handleselectone}></ItemList> */}
      </Layout>
    );
  }
}

export default withAuthSync(SearchForm);
