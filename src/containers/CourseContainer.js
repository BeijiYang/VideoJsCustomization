import React, { Component } from 'react';
import Course from '../components/Course'

class CourseContainer extends Component {
  render() {
    return (
      <div className="course-container">
          <h2>CourseDemo</h2>
          <Course />
      </div>
    );
  }
}

export default CourseContainer;
