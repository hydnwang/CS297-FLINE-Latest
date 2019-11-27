import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { withAuthSync } from '../../../utils/auth';

class CourseCodeSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({courseCode: event.target.value});
    this.props.setCode(event.target.value);
  }

  render() {
    return (
      <div>
        <TextField
          id="course-code"
          label="Course Code or Range"
          value={this.state.courseCode}
          onChange={this.handleChange}
          type="search"
          fullWidth
        />
        {/* helperText="ex. 14200, 29000-29100" */}
      </div>
    );
  }
}

export default withAuthSync(CourseCodeSearchBar);
