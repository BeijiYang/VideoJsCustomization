# 在React项目中，使用自定制的播放器

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

* 修改controlBar颜色
