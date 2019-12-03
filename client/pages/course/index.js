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

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  menu: {
    width: 200,
  },
}));

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

  render() {
    const { classes } = this.props;
    return (
      <Layout title='Course' loginStatus={this.props.loginStatus}>
        <Container maxWidth="sm" style={{ flex: 1 }}>
        <h1>Course Search</h1>
          <div >
              <Grid container
                direction="row"
                alignItems="center"
                spacing={2}
                maxWidth="sm" style={{ flex: 1 }}>
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
                maxWidth="sm" 
                style={{ flex: 1 }}>
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
        </Container>
        <ItemList token = {this.props.token} data = {this.state.apiResponse} term ={this.state.term}></ItemList>
      </Layout>
    );
  }
}

export default withStyles(useStyles)(withAuthSync(SearchForm));
