### 安装运行

##### 1.下载或克隆项目源码
```js
git clone git@gitlab.modianinc.com:caosaiqi/csq.fe.acp.modian.com.git
```

##### 2.yarn 安装依赖(国内建议增加淘宝镜像源，不然很慢，你懂的 😁)

> 有些老铁遇到运行时报错，首先确定下是不是最新稳定版的 nodejs 和 yarn，切记不要用 cnpm

```js
// 首推荐使用yarn装包，避免自动升级依赖包
yarn;
```

##### 3.启动项目

```js
yarn start
```

##### 4.打包项目

```js
yarn build
```
### 依赖模块
<span style="color: rgb(184,49,47);">项目是用 vue-cli 创建的，主要还是列出新加的功能依赖包</span>

-   [vue](https://github.com/vuejs/vue)(<span style="color: rgb(243,121,52);">构建视图库， 大家都懂</span>)
-   [vue-router](https://github.com/vuejs/vue-router)(<span style="color: rgb(243,121,52);">用来管理页面路由</span>)
-   [vuex](https://github.com/vuejs/vue-router)(<span style="color: rgb(243,121,52);">用来管理项目全局状态</span>)
-   [element-ui](https://github.com/ElemeFE/element)(<span style="color: rgb(243,121,52);">基础UI组件</span>)
-   [echarts](https://github.com/ecomfe/vue-echarts)(<span style="color: rgb(243,121,52);">如果需要表功能，用这个echarts</span>)
-   [lodash](https://github.com/js-cookie/js-cookie)(<span style="color: rgb(243,121,52);">基础方法，例如判空， 判断类型、数据比较....</span>)
-   [js-cookie](https://github.com/js-cookie/js-cookie)(<span style="color: rgb(243,121,52);">用来设置浏览器cookie</span>)
-   [animate.css](https://github.com/animate-css/animate.css)(<span style="color: rgb(243,121,52);">css动画库，满足日常动画需求</span>)
-   [clipboard](https://github.com/zenorocha/clipboard.js)(<span style="color: rgb(243,121,52);">复制粘贴功能</span>)
-   [axios](https://github.com/mzabriskie/axios)(<span style="color: rgb(243,121,52);">http 请求模块，可用于前端任何场景，很强大 👍</span>)
-   其他小细节省略


### 功能模块

# 基础配置
-   环境分离
    - 生产环境配置文件💼.env.development
    - 线上环境配置文件💼.env.production
-   webpack devServe
    - 考虑到每个人的配置习惯不同，如有自定义 devServer 配置的需求请在根目录下创建 dev.server.config.js 文件 dev.server.config.js 不进行 git 提交操作
-  mock数据
-  使用eslint统一编码风格 配置文件💼 .eslintrc.js








### 代码目录
```js
├─.env.development                      --生产环境配置
├─.env.production                       --线上环境配置
├─.eslintrc.js                          --代码风格配置
├─babel.config.js                       -- 
├─dev.server.config.js                  -- webpack devServe配置 不会被git提交
├─jest.config.js
├─jsconfig.json
├─package.json
├─postcss.config.js
├─vue.config.js
├─src
|  ├─App.vue                            -- vue入口视图
|  ├─main.js                            -- vue全局配置
|  ├─permission.js                      -- 项目权限管理
|  ├─settings.js
|  ├─views                              -- 视图文件
|  |   ├─demo                           -- 页面
|  |   |  ├─dialogs.js                  
|  |   |  ├─drawer.js
|  |   |  └index.js
|  ├─utils                             
|  |   ├─index.js                       -- 公共方法
|  |   ├─clipboard.js                   -- 复制功能
|  |   ├─manager.js                     -- 接口资源管理
|  |   ├─request.js                     -- 接口请求管理
|  |   ├─permission.js                  -- 权限管理
|  |   └validate.js                     -- 公共表单校验规则
|  ├─styles                             -- 全局样式
|  |   ├─element-ui.scss                -- 覆盖elm-ui样式
|  |   ├─element-variables.scss         -- 自定义elm-ui主题
|  |   ├─index.scss                     
|  |   └variables.scss                  -- 样式常量定义
|  ├─store                              -- 公共状态管理
|  |   ├─getters.js
|  |   ├─index.js                       
|  |   ├─modules
|  |   |    ├─app.js                    -- 全局状态
|  ├─router                             -- 路由配置
|  ├─mixins                             -- 组件公共mixin
|  ├─layout                             -- 项目视图框架
|  |   ├─index.vue
|  |   ├─components
|  |   |     ├─AppMain.vue              -- 项目主要内容
|  |   |     ├─Navbar.vue               -- 项目头部内容
|  |   |     ├─index.js 
|  |   |     ├─Sidebar                  -- 项目菜单
|  ├─icons
|  ├─filters
|  ├─sections                           -- 公共业务组件
|  ├─components                         -- 公共基础组件
|  ├─assets                             -- 静态文件
|  ├─api                                -- api接口
├─public
|   ├─favicon.ico
|   └index.html
├─mock
|  ├─order.js
├─build
|   └index.js
```