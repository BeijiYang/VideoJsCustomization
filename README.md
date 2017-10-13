# 在React项目中，使用video.js进行视频播放器的自定制

**-----更新中-----**
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

* 修改controlBar颜色

* 实现空格键暂停/播放
  * 原本默认行为是 仅在播放按钮被选中时，按键可以控制播放/暂停，不论全屏与否；
  * 现在，只需首次鼠标点开视频，就可以通过空格键控制播放/暂停
    * 更新：更合理的焦点管理
      * 情景：看视频时可能需要暂停下来做别的事情
      * 对策：
        * 当视频播放的过程中，不论鼠标点哪里，都让焦点保持在播放器，以便通过空格键控制
        * 当视频处于暂停状态，可以通过鼠标点击等行为切换焦点
