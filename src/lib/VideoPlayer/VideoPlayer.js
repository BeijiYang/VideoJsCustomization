import React from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './videojs-hqcat.css'

export default class VideoPlayer extends React.Component {

  componentDidMount () {
    // instantiate video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady () {
      console.log('onPlayerReady', this)
    })
  }

  // destroy player on unmount
  componentWillUnmount () {
    if (this.player) {
      this.player.dispose()
    }
  }

  handleSpaceKeyDown = (event) => {
              if (event.which === 32) {
                event.preventDefault();
                console.log(this.player.state.state);
                if (this.player) {
                  switch (this.player.state.state) {
                    case 'playing':
                      this.player.pause()
                      break;
                    case 'pause':
                      this.player.play()
                      break
                    default: return ;
                  }
                } else {
                  console.log('error');
                }
              }
         }
  onClick = (e) => {
    console.log(e.target);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render () {
    // write a plugin
    var that = this
    const examplePlugin = function (options) {
      this.on('play', function (e) {
        console.log('playback has started!')
        console.log(that);
        this.setState({
          state: 'playing'
        })
        that.refs.testRef.focus()
      })

      this.on('pause', function (e) {
        console.log('playback has paused')
        this.setState({
          state: 'pause'
        })
      })
    }

  //   const handleKeyPress = function (event) {
  //     this.on('play', function () {
  //       console.log(event);
  //       console.log("sdfdsf");
  //     })
   //
  //    // Support Space (32) or Enter (13) key operation to fire a click event
  //    if (event.which === 32 || event.which === 13) {
  //      console.log("323232");
  //      event.preventDefault();
  //      this.trigger('click');
  //    }
  //  }

    // Registering A Plugin
    videojs.registerPlugin('examplePlugin', examplePlugin)
    // videojs.registerPlugin('handleKeyPress', handleKeyPress)

    return (
      <div data-vjs-player
        onKeyDown={this.handleSpaceKeyDown}
        ref='testRef'
        >
        <video
          ref={node => this.videoNode = node}
          className='video-js vjs-hqcat'
          onClick={this.onClick.bind(this)}
        />
      </div>
    )
  }
}
