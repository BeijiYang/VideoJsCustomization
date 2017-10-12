import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer'

class Course extends Component {
  render() {
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
    }]
  }

    return (
      <div className="course">
          <h2>Course</h2>
          <VideoPlayer { ...videoJsOptions } />
      </div>
    );
  }
}

export default Course;
