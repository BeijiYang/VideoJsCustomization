import React, { Component } from 'react'
import VideoPlayer from '../lib/VideoPlayer/VideoPlayer'

class Course extends Component {

  render () {
    return (
      <div className='course-container'>
        <h2>CourseDemo</h2>
        <VideoPlayer {...this.props.videoJsOptions} />
      </div>
    )
  }
}

export default Course
