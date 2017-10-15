# 在 React 项目中，使用 video.js 进行 HTML5 视频播放器的自定制

## 讲解稿

### 0-Intro

**案例目的：**

在 React 项目中使用 video.js，实现 HTML5 视频播放器的自定制。

**关于 [video.js](http://videojs.com/)：**

引用官方的自我介绍：

> video.js is a free and open source HTML5 video player.

这是个免费且开源的 HTML5 视频播放器。


### 1-着手开发

 video.js 使用了 [Grunt](https://gruntjs.com/) 作为构建工具。所以，在开始写代码之前，请确保开发环境里已经装有 [Node](https://nodejs.org/) 和 [Grunt](https://gruntjs.com/)

安装 Grunt:
```
npm install -g grunt-cli
```

### 2-创建一个 React 项目
```
create-react-app myVideoPlayer
```

然后删去对我们没用的代码

[commit](https://github.com/BeijiYang/VideoJsCustomization/tree/06e79e32b3cbfb8571a788166279083729f40e6c)

### 3-React 项目中引入 video.js

本节，我们将在 React 项目中引入 video.js ，为单调的页面上添加一个 HTML5 视频播放器。

#### 安装 video.js
```
npm install --save-dev video.js
```

#### 项目中引入 video.js

对于如何在 React 项目中使用 video.js ，官方文档就这一篇：[ video.js  and  ReactJS integration](http://docs.videojs.com/tutorial-React.html)

我们参考文档中的基本方法，主要思路就是利用 React 组件的声明周期函数：
* 在 `componentDidMount` 阶段实例化一个 video.js 播放器
* 在 `componentWillUnmount` 阶段将其销毁

在我们的项目中，新建文件夹 `src/lib/VideoPlayer`，在其中新建组件 `VideoPlayer.js`:

特别注意，需要加入对 css 文件的引用

**VideoPlayer.js**
```
import React from 'React'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

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

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/ video.js /pull/3856
  render () {
    return (
      <div data-vjs-player>
        <video ref={node => this.videoNode = node} className='video-js' />
      </div>
    )
  }
}

```

然后新建课程组件，它将引用 VideoPlayer 组件：

根据 [Dan Abramov的思想](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)，组件拆分为展示性组件和容器组件（Presentational and Container Components）

**src/containers/App.js**
```
import React, { Component } from 'React'
import CourseContainer from './CourseContainer'

class App extends Component {
  render () {
    return (
      <div className='app'>
        <CourseContainer />
      </div>
    )
  }
}

export default App
```

**src/containers/CourseContainer.js**
```
import React, { Component } from 'React'
import Course from '../components/Course'

class CourseContainer extends Component {
  render () {
    // VideoJsOptions for this Course
    const CourseVideoJsOptions = {
      autoplay: true,
      controls: true,
      sources: [{
        src: 'http://vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
      }]
    }

    return (
      <Course videoJsOptions={CourseVideoJsOptions} />
    )
  }
}

export default CourseContainer
```

**src/components/Course.js**
```

import React, { Component } from 'React'
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
```

至此，在课程页面上就已经有一个播放器了。我们在 React 项目中成功引入了 video.js 。

很容易发现，页面加载完成后，播放器会自动播放视频。能否禁止这个默认行为呢？

下一节我们就看如何对播放器的功能进行控制和扩展。

[commit](https://github.com/BeijiYang/VideoJsCustomization/tree/897f3ca7ccce59cb9490011e19bad0a7112088c8)


### 4-用 options 控制功能

本节，我们用 options 实现对基本功能的控制。

 video.js 中，可以通过 [options](http://docs.videojs.com/tutorial-options.html) 对播放器实例进行控制，如循环播放、静音、以及宽高样式等方面。

上面案例代码中的 `CourseVideoJsOptions` 就是一个例子。定义一个 options 对象，将其作为参数传入 VideoPlayer 组件中：

**src/components/Course.js**
```
... ...
<VideoPlayer {...this.props.videoJsOptions} />
... ...
```

案例代码中的 options 对象如下：

```
const CourseVideoJsOptions = {
  autoplay: true,
  controls: true,
  sources: [{
    src: 'http://vjs.zencdn.net/v/oceans.mp4',
    type: 'video/mp4'
  }]
}
```

其中有三个 key，对照 [options](http://docs.videojs.com/tutorial-options.html) 文档，不难知道
* autoplay 是否自动播放
* controls 是否显示控制条
* sources 规定视频源

通过 options，我们可以对功能进行控制与添加：
* playbackRates：倍速播放
* poster： 视频播放前显示的图片
* volumePanel：音量条
* fluid： 播放器自动充满容器

```
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
      inline: false // 将音量控制条垂直
    }
  }
}
```

**src/components/Course.js**
```

import React, { Component } from 'React'
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
```

注：这里使用了 [styled-component](https://www.styled-components.com/)。

在播放器外套了一层 VideoPlayerWrap（其实就是 div ），这么做的好处在于：
* 由于 VideoPlayer options 中打开了 `fluid`，播放器可以自适应 VideoPlayerWrap 容器。如此，options 就可以专注于对功能进行控制。
* VideoPlayerWrap 的样式代码，同时也规定了播放器的样式。将样式代码集中写到展示性组件中，也符合 Dan Abramov 的思想

本节，我们用 video.js 的 options 机制，实现了播放器的倍速播放、添加 poster、样式控制等功能。

以上都是对现有功能进行控制。下一节，我们来看看如何按照我们的想法，对播放器的功能进行扩展。




### 5-写插件(Plugin)扩展功能

本节，我们的目的是，扩展空格键控制播放/暂停的功能。

 video.js 的默认动作是，仅仅在 control bar 的播放键被鼠标选中时，才能用空格/回车键控制播放/暂停。不太方便。
我们要将其改进为：点开视频后，就可以通过空格键控制视频的播放/暂停。

#### 引入插件

我们可以通过写自己的[插件](http://docs.videojs.com/docs/guides/plugins.html)来实现额外的功能。参考这篇文档，尝试如下：

**VideoPlayer.js**

```
··· ···
render () {
   // 写插件：当监听到播放器实例的播放（play）事件，就输出一条语句
   function examplePlugin(options) {
       this.on('play', function(e) {
         console.log('playback has started!');
       });
     };

   // 注册该插件
   videojs.registerPlugin('examplePlugin', examplePlugin)

   return (
     ··· ···
```

目前插件已经存在，可以根据需要打开或关闭它

下面尝试使用

**CourseContainer.js**
```
··· ···
const CourseVideoJsOptions = {
  autoplay: false,
  controls: true,

  ... ...

  // 使用该插件
  plugins: {
    setStateandFocusPlugin: true
  }
}
... ...
```

完成以上步骤后，再次点开视频，发现控制台输出了 `playback has started!` ，说明插件应用成功。

关于代码中的事件监听，参考文档 [Event Target](http://docs.videojs.com/tutorial-event-target.html)

#### 设置播放器实例的状态

在插件代码中加一条 console 语句如下。

如此，在控制台中，就可以在点开视频时看到，这句代码输出了该播放器的实例对象

**VideoPlayer.js**
```
··· ···
function examplePlugin(options) {
    this.on('play', function(e) {
      console.log(this)
      console.log('playback has started!')
    });
  };
  ... ...
```

仔细查看该对象的属性，发现有 `setState` 和 `state` 两条。
据此，我们尝试根据播放器的播放状态来设置 `state` 值

注意，这和 React 组件的 state 是两回事。

**VideoPlayer.js**
```
··· ···
this.on('play', function (e) {
  console.log(this);
  console.log('playback has started!')
  this.setState({
    state: 'playing'
  })
  console.log(this.state.state)
})

this.on('pause', function (e) {
  console.log('playback has paused')
  this.setState({
    state: 'pause'
  })
  console.log(this.state.state)
})
... ...
```

此时，再让视频播放/暂停，都会看到控制台输出的状态，说明设置成功。

#### 初步改进空格键的功能

空格键的默认动作是:
* 当鼠标选中 control bar 的播放键时，空格键可以切换播放/暂停；
* 当鼠标选中全屏键时，空格键可以切换全屏；
* 当鼠标选中静音键时，空格键可以切换静音；
* 当鼠标什么也没选中时，空格键无法控制播放器的任何功能。

这样既麻烦又不实用，因为只有“播放/暂停”功能才是使用频率最高的功能。让空格键在任何情况下都能直接控制暂停功能，可以明显提升用户体验。

接下来，我们需要监听“按下空格键”这个事件。这个需求可以分为两步：
  * 监听键盘事件
  * 判断是否为空格键

对于前者，我们可以使用 [onKeyDown 事件](http://www.w3school.com.cn/jsref/event_onkeydown.asp)，它会在用户按下一个键盘按键时发生。

对于后者，涉及到 [keyCode/键码-文档链接待补充]()的知识。具体到这个案例，空格键的键码是32。

推荐[这个网站](http://keycode.info)，它可以很方便地查询键盘各个按键的键码，十分好用。

通过 onKeyDown 事件的文档可以看到，<video> 标签不支持它，所以我们把它写在包裹 <video> 标签的 <div> 标签中。代码如下

**VideoPlayer.js**
```
··· ···
videojs.registerPlugin('setStateandFocusPlugin', setStateandFocusPlugin)
// videojs.registerPlugin('handleKeyPress', handleKeyPress)

return (
  <div data-vjs-player
    onKeyDown={this.handleSpaceKeyDown}
    >
    <video
    ref={node => this.videoNode = node}
    className='video-js vjs-hqcat'
    />
    </div>
    )
  }
}
```

由于 JS 的[事件冒泡-文档链接待补充]()机制，onKeyDown 事件是可以成功捕获的。

事实上，如果在目前这个 div 标签的外层再套一层 div ，外层的 div 也同样能够捕获 onKeyDown 事件，有兴趣的可以试一下。

接下来写监听到 onKeyDown 事件后调用的函数：

* 首先，我们需要判断是否为空格键。
* 如果是，我们需要禁止原来默认的动作。
* 然后，利用之前设置的视频播放状态，进行相应的操作：
  * 如果视频正在播放中，则暂停视频
  * 如果视频正在暂停中，则继续播放视频

**VideoPlayer.js**
```
··· ···
componentWillUnmount () {
  if (this.player) {
    this.player.dispose()
  }
}

handleSpaceKeyDown = (event) => {
  // 判断是否为空格键
  if (event.which === 32) {
    event.preventDefault()
    if (this.player) {
      // 根据播放状态的不同，进行相应的操作
      switch (this.player.state.state) {
        case 'playing':
        this.player.pause()
        break
        case 'pause':
        this.player.play()
        break
        default: return
      }
    } else {
      console.log('error')
    }
  }
}
... ...
```

至此，我们完成了初步的改进。但目前扔有一些问题：
* 点击视频播放后，必须再点一下视频，才能用空格键控制暂停/播放；
* 如果在播放时，鼠标点一下页面上的其他地方，空格键又失效了。

下一步来解决这些问题。

#### 改进焦点管理

元素获得焦点的方式有页面加载、用户输入（通常是通过 Tab 按键）和在代码中调用 `focus()` 方法。相应的文档获得了焦点，用户才能与页面交互。

于是，我们是思路是：当视频播放时，调用 `focus()` 方法，使得播放器获得焦点。

如何获取播放器的 DOM 元素？可以使用 React 的 ref。
参考 [Refs and the DOM](https:// React js.org/docs/refs-and-the-dom.html)

如何在插件代码中获取 React 组件？可以从它的外部传 `this` 进去。

尝试改进代码：

**VideoPlayer.js**
```
··· ···
render () {
  // write a plugin
  var that = this
  const setStateandFocusPlugin = function (options) {
    this.on('play', function (e) {
      console.log('playback has started!')

      // 控制台输出结果表明成功获取VideoPlayer组件
      console.log(that)

      this.setState({
        state: 'playing'
      })
      // 控制焦点
      that.refs.videoPlayerRef.focus()
    })
    ... ...
    return (
      <div data-vjs-player
        onKeyDown={this.handleSpaceKeyDown}
        ref='videoPlayerRef'
        >
        <video
          ref={node => this.videoNode = node}
          className='video-js vjs-hqcat'
        />
      </div>
    )
  }
}
```

现在再试用播放器，可以发现第一个问题已经解决了。点开视频后，直接按空格键，视频暂停。

第二个问题依然存在。这是因为 `this.on('play', cb)` 这个监听事件不是持续的。视频播放的过程中，再点击页面的其他地方，播放器会市区焦点。

有没有更好的方法？ video.js 的 github issue 里，官方人员提及 video.js 支持全部原生  HTML5 media elements events, 仔细查阅 [W3C Recommendation 文档 media event summary部分](https://www.w3.org/TR/ HTML5 /embedded-content-0.html#mediaevents)，以及官方人员的 [events文档](http://docs.videojs.com/docs/api/player.html#events)，发现这一条：

>**timeupdate**
>
>Fired when the current playback position has changed * During playback this is fired every >15-250 milliseconds, depending on the playback technology in use.
>
>Defined in https://github.com/videojs/ video.js /blob/master/src/js/player.js line number: 2792


只要在播放，就会持续监听到该事件。十分适合用来解决我们的问题。有了它，`this.on('play', cb)`的回调中也不需要进行焦点控制了。

根据该插件的功能，将其命名为 `setStateandFocusPlugin`，完整代码如下

**VideoPlayer.js**
```
··· ···
const setStateandFocusPlugin = function (options) {
  this.on('play', function (e) {
    console.log('playback has started!')
    console.log(that)
    this.setState({
      state: 'playing'
    })
  })

  this.on('pause', function (e) {
    console.log('playback has paused')
    this.setState({
      state: 'pause'
    })
  })

  this.on('timeupdate', function(e){
    that.refs.videoPlayerRef.focus()
  })
}
... ...
```

注意，注册以及使用插件的代码中也需要同步改名。

现在再来尝试，发现第二个问题也解决了。

目前的代码可以实现：
* 当视频播放的过程中，不论鼠标点哪里，都让焦点保持在播放器，以便通过空格键控制；
* 看视频时也可能需要暂停下来做别的事情，那么当视频处于暂停状态，就可以通过鼠标点击等行为切换焦点。


空格键控制播放/暂停的功能就比较完善了。

#### 总结

这一小节，我们实现了一个 video.js 的插件（涉及到插件的注册，使用等），通过它监听播放器实例的事件，在不同的事件被触发时，进行相应的操作：
* 当监听到播放（`play`）事件的触发，设置播放器实例状态为 `playing`
* 当监听到暂停（`pause`）事件的触发，设置播放器实例状态为 `pause`
* 当监听到 `timeupdate` 事件的触发，让播放器组件获得焦点，涉及到
  * `focus()` 方法
  * `ref`

然后，监听键盘事件，当监听到用户按下空格键时，禁止原来的默认动作，再根据播放器实例此时的状态，进行相应的操作
* 若正在播放中，则暂停之
* 若视频被暂停，则播放之

涉及到：
  * `event.preventDefault()`
  * `onKeyDown`
  * 事件冒泡
  * 键码



### 6-实现样式的自定制

以上内容都聚焦于功能。本节，对播放器的外观进行修改，创造自己的播放器皮肤文件。

官方的 [Creating a Skin](http://docs.videojs.com/tutorial-skins.html) 文档中推荐的方法是直接覆盖掉原有的默认皮肤。

#### 为播放器增加自定制的 `className`

文档中的示例代码为`<video>`标签增加了一个新的 `class`。

类似的，在我们的 React 项目中，则需增加一个新的className：`vjs-hqcat`

**VideoPlayer.js**
```
<video
  ref={node => this.videoNode = node}
  className='video-js vjs-hqcat'
/>
```

#### 新建自定制的皮肤样式文件

我们将其命名为 `videojs-hqcat.css`，放到 `src/lib/VideoPlayer` 目录下。

#### 创建自己的皮肤

现在，利用浏览器的开发工具，找到自己想修改的部分的选择器，就可以进行相应的修改了！

**居中播放键**

例如，在默认皮肤里，视频加载完成后，大播放键的位置是画面的左上角，看起来很别扭。

通过 Chrome Dev tool，发现播放键的类名是 `vjs-big-play-butto`。据此，有如下代码：

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*居中按钮*/
.vjs-hqcat .vjs-big-play-button {
  height: 1.5em;
  width: 3em;
  left: 50%;
  top: 50%;
  margin-left: -1.5em;
  margin-top: -0.75em;
  border-color: rgb(0, 188, 212);
}
```

成功居中了播放键，顺便改了个好看的颜色。

**修改 controlBar 颜色**

同理，给播放器的控制栏也换个好看的颜色

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*颜色*/
.vjs-hqcat.video-js {
  color: rgb(0, 188, 212);
}

.vjs-hqcat:hover .vjs-big-play-button,
.vjs-hqcat .vjs-big-play-button:focus {
  border-color: rgb(0, 188, 212);
}

.vjs-hqcat .vjs-volume-level,
.vjs-hqcat .vjs-play-progress,
.vjs-hqcat .vjs-slider-bar {
  background:rgb(0, 188, 212);
}

```

这下颜色顺眼多了！

还有些小问题，比如控制栏的字体大小，以及倍速选择栏的样式等。同理，找到相应的class名，在新皮肤文件中添加代码如下：

**src/lib/VideoPlayer/videojs-hqcat.css**
```
/*控制栏字体*/
.vjs-hqcat .vjs-control-bar {
  font-size: small;
}

.vjs-hqcat .vjs-menu-item {
  font-size: small;
}

.vjs-hqcat li.vjs-selected {
  background-color:rgb(0, 188, 212);
}

.vjs-hqcat .vjs-playback-rate-value {
  font-size: small;
  line-height: 3em;
}

/*完善倍速选择器样式*/
.vjs-menu li.vjs-selected,
.vjs-menu li.vjs-selected:focus,
.vjs-menu li.vjs-selected:hover {
  background-color: #2B333F;
  color: rgb(0, 188, 212); }

```

创建自定制皮肤文件成功！



**-----------------------------------更新中-----------------------------------**
[讲解文字稿](https://github.com/BeijiYang/VideoJsCustomization/blob/master/IntroMarkDown/%E6%96%87%E5%AD%97%E7%A8%BF.md)

### GET STARTED

* 确保自己装了`Node`和`Grunt`
  * 全局安装Grunt `npm install -g grunt-cli`

* create-react-app 创建初始项目，删去没用的代码

* 安装`video.js`
  * `npm install --save-dev video.js`

* 引入播放器组件
  * 创建`VideoPlayer.js` ，官方建议方法二没跑通，先用方法一
  * 播放器组件和参数分离

* 按照Dan的思想，将组件拆分整理为container & component

* 把相对独立的VideoPlayer组件放到`Lib/`里

* 用options实现倍速播放，音量条竖直等等

* 用[这篇文档的Customize Styles部分](http://docs.videojs.com/tutorial-skins.html)进行样式的自定制
  * 为video实例增加属性
    * `<video ref={node => this.videoNode = node} className='video-js vjs-hqcat' />`
  * 增加自定制样式文件
    *  `videojs-hqcat.css`

* 修改播放按键
  * 居中
  * 颜色

* 修改 controlBar 颜色

* 实现空格键暂停/播放
  * 原本默认行为是 仅在播放按钮被选中时，按键可以控制播放/暂停，不论全屏与否；
  * 现在，只需首次鼠标点开视频，就可以通过空格键控制播放/暂停
    * 更新：更合理的焦点管理
      * 情景：看视频时可能需要暂停下来做别的事情
      * 对策：
        * 当视频播放的过程中，不论鼠标点哪里，都让焦点保持在播放器，以便通过空格键控制
        * 当视频处于暂停状态，可以通过鼠标点击等行为切换焦点

* 完善了 controlBar 样式的细节问题
  * 字体大小
  * 倍速选择框样式
