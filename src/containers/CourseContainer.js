import React, { Component } from 'react'
import Course from '../components/Course'

class CourseContainer extends Component {
  render () {
    // VideoJsOptions for this Course
    const CourseVideoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }],
      poster: 'http://videojs.com/img/logo.png',
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      }
    }

    return (
      <Course videoJsOptions={CourseVideoJsOptions} />
    )
  }
}

export default CourseContainer
