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
      fluid: 'true', // put the player in the VideoPlayerWrap box
      'playbackRates': [0.75, 1, 1.5, 2],
      controlBar: {
        volumePanel: {
          inline: false // vertical VolumeControl
        }
      },
      // Using A Plugin
      plugins: {
        setStatePlugin: true
      }
    }

    return (
      <Course
        videoJsOptions={CourseVideoJsOptions}
      />
    )
  }
}

export default CourseContainer
