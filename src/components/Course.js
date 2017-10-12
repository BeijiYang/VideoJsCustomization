import React, { Component } from 'react'
import VideoPlayer from '../lib/VideoPlayer/VideoPlayer'
import styled from 'styled-components'

const VideoPlayerWrap = styled.div`
  margin: 10px;
  padding: 10px;
  border: 2px solid green;
`

class Course extends Component {

  render () {
    return (
      <div className='course-container'>
        <h2>CourseDemo</h2>
        <VideoPlayerWrap>
          <VideoPlayer {...this.props.videoJsOptions} />
        </VideoPlayerWrap>
      </div>
    )
  }
}

export default Course
