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

    this.state = {
      dept: 'ALL',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
      console.log(this.state.dept);
    return this.state.dept !== nextState.dept;
  }

//   handleChange(event) {
//     console.log("DepatBar handleChange name:"+[event.target.name]);
//     console.log("DepatBar handleChange value:"+event.target.value);
//     this.state={dept:event.target.value,};
//     console.log("DepatBar handleChange state:"+this.state.dept);
//     this.props.setDept(this.state.dept);
//   }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.setDept(event.target.value);
  }

  render() {
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor="dept-select">Department</InputLabel>
        <Select
          value={this.props.dept}
          onChange={this.handleChange}
          inputProps={{ name: 'dept', id: 'dept-select' }}
          fullWidth
        >
          {Dept.map((category) => {
            return (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default DeptBar;
