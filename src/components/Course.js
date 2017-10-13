import React, { Component } from 'react'
import VideoPlayer from '../lib/VideoPlayer/VideoPlayer'
import styled from 'styled-components'

const VideoPlayerWrap = styled.div`
  margin: 10px;
  padding: 10px;
`

const PWrap = styled.div`
  margin-left: 42.5%;
  font-size: 20px;
  font-weight: bold;
`

class Course extends Component {

  render () {
    return (
      <div>
        <PWrap>CourseDemo</PWrap>
        <VideoPlayerWrap>
          <VideoPlayer {...this.props.videoJsOptions} />
        </VideoPlayerWrap>
      </div>
    )
  }
}

export default Course
