# miniprogram-logger-plus

🔊 一款高效实用且可扩展的小程序日志工具

![](https://img.inlym.com/a48eee9672444fb69a84b5f78e8cc4a4.png)



## 目录

-   [介绍](#介绍)
-   [安装](#安装)
-   [使用](#使用)
    -   [构建 npm](#构建 npm)
    -   [入门](#入门)
-   [配置](#配置)
-   [示例](#示例)
-   [作者](#作者)
-   [参与](#参与)
-   [许可证](#许可证)



## 介绍

无论是在开发调试阶段或者线上运行阶段，日志是帮助我们发现问题以及排查修复问题的一个好的工具。依托于微信小程序的高度封装，打印日志变得十分简单。比如使用 `console` 就可以在控制台打印日志，除此之外，微信小程序提供了一款十分实用的  [实时日志](https://developers.weixin.qq.com/miniprogram/dev/framework/realtimelog/) ，它的一个优点是：日志汇聚并实时上报到小程序后台，可直接在小程序后台查看日志，无需人工提交日志。


`miniprogram-logger-plus` 默认集成了上面 `console` 和 `实时日志`，开发者在使用时，可以 `零配置` 使用。



## 安装

按照通用的方式使用 npm 下载安装到你的项目下即可，无需全局安装。


安装命令：

```shell
npm i miniprogram-logger-plus
```



## 使用

使用前可以阅读微信小程序对于 npm 包的使用方式（ [npm 支持](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)），当然你也可以按照笔者的说明进行使用。



### 构建 npm

普通的 npm 包在小程序中需要先进行 [构建 npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html) 后才能使用。具体操作为在安装完成后，点击 `小程序开发工具` 菜单栏的 `工具` - `构建 npm`。

![](https://img.inlym.com/96b18dd9e0154bd5801345979824f1ef.png)



点击后，显示以下界面，表示构建成功。

![](https://img.inlym.com/b5dddd644fed40cb9a2742cded301ee5.png)



可进入 `miniprogram_npm` 目录进行进一步检查，出现图示红框项目，表示构建成功。

![](https://img.inlym.com/be7cbccbff60436194951ad0a9b6ef44.png)



### 入门

一个非常简单的使用方式如下：

```js
// 引入
const Logger = require('miniprogram-logger-plus')

// 实例化
const logger = new Logger()

// 打印日志
logger.debug('我是打印的日志内容')
```



## 配置

你可以 `零配置` 直接实例化使用，同时，为了支持更多使用场景，插件支持以下配置项。配置项在实例化阶段引入，即

```js
// 实例化时引入配置项
const logger = new Logger(options)
```



目前支持以下配置项：

|    属性     |  类型   | 必填 | 默认值 |                             说明                             |
| :---------: | :-----: | :--: | :----: | :----------------------------------------------------------: |
|    level    | string  |  否  | 'ALL'  | 日志等级，支持：'ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE' |
|   console   | boolean |  否  |  true  |                    是否开启 console 日志                     |
| realtimeLog | boolean |  否  |  true  |               是否开启实时日志（realtimeLog）                |



## 示例

下面展示一个使用示例：

```js
// 实例化时引入配置项
const logger = new Logger({
  level: 'WARN',  // 日志等级为 'WARN'
  realtimeLog: false,  // 关闭实时日志
})

logger.debug('打印 DEBUG 日志')  // 当前日志等级（'WARN'）下将不会打印该日志
logger.warn('打印 WARN 日志')
```



## 进阶

一般情况下，大部分开发者用不到本节列举的功能，为了少数场景下的使用便利，提供以下功能。



### Logger API

属性：

| 属性  |  类型  |              说明              |
| :---: | :----: | :----------------------------: |
| level | string | 日志等级，可查看说修改日志等级 |



使用示例：

```js
logger.level  // 'WARN'

logger.level = 'INFO'  // 将日志等级变更为 'INFO'
```



方法：

`add(options: object)`
添加一个 `日志输出源` ，见 [日志输出源](#日志输出源)



`remove(name: string)`
移除一个日志输出源



`enable(name: string)`
启用一个日志输出源



`disable(name: string)`
禁用一个日志输出源



### 日志输出源

插件内置了 2 款日志输出源：`console` 和 `realtimeLog`，你除了可以禁用默认的日志输出源外，还可以自定义日志输出源，然后使用  `add` 方法添加该日志输出源，下面介绍一个示例：

```js
const options = {
  /** 自定义的日志输出源名称，不要和现有的重复即可 */
  name: 'customLog',
  
  /** 日志等级，仅等于或高于该等级的日志会被传输到当前日志输出源中 */
  level: 'INFO',
  
  /** 日志前缀，将会被按序替换为对应内容 */
  prefix: ['now', 'duration', 'level'],
  
  /** 适配器，最终将调用该适配器方法打印日志，这里以 console 为例 */
  adapter: {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  
  // 实际上，以上内容可以缩写为 `adapter: console,`
}

// 使用 add 方法挂载到日志上
logger.add(options)

// 临时禁用该日志输出源
logger.disable('customLog')

// 再次启用
logger.enable('customLog')

// 永久移除
logger.remove('customLog')
```

当你自定义日志输出源的时候，可以参考以上示例进行创建。




## 作者

我是 [inlym](https://www.inlym.com) ，欢迎访问我的主页。


如果你有任何问题或者建议，欢迎联系我，以下是我的联系方式：

-   邮箱：inlym@qq.com
-   主页：[www.inlym.com](https://www.inlym.com)



## 参与

非常欢迎你能够参与这个项目的开发和维护。

你可以通过以下几种方式参与到项目中：

1.  提建议和需求。对于几句话就能说清楚的建议和需求，你可以直接 提一个 [New Issue](https://github.com/inlym/miniprogram-logger-plus/issues/new) 。
2.  Fork 项目，修改代码，然后提交 Pull requests 。（提交前请检查务必通过 ESLint 检查）



## 许可证

本插件使用 [MIT](LICENSE) 许可证。
