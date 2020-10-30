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
|  |   ├─demo                           -- 视图页面
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


### 基础服务

##### 项目配置
-   环境分离
    > 生产环境配置文件💼.env.development
    > 线上环境配置文件💼.env.production
-   webpack devServe
    > 考虑到每个人的配置习惯不同，如有自定义 devServer 配置的需求请在根目录下创建 dev.server.config.js 文件 dev.server.config.js 不进行 git 提交操作
-  mock数据
-  使用eslint统一编码风格 配置文件💼 .eslintrc.js

##### 与后台接口交互处理
-  request.js，封装axios统一接口配置，配置文件💼 /src/utils/request.js（目前近支持post 和 get）
   ```js
   // post 方式
    export const apiGetLeftMenu = (params) => request.get('PATH/PATH', params)
   ```
   ```js
   // post 方式
    export const apiPostLeftMenu = (params) => request.post('PATH/PATH', params)
   ```
-  manager.js，针对接口的单个资源对增上改成统一处理 配置地址💼 /src/utils/request.js
   > 什么是一个资源比如`order`通过order，往下延生出`order/create`、`order/delete`、`order/[更多个性化操作]`

  ```js
  // manager满足基本满足日常所有增删该查所用的的接口格式；
  // manager 导出的是一个类方法（class），用之前需要先new一下，需要一个资源地址作为参数比如order；
  const manager = new Manager('order')

  // 获取列表, 传入列表所需参数
  manager.list(params)

  // 创建条新数据
  manager.create({
  	path: 'create', //如果不传则默认 create
    params: {test: 123} //创建参数
  })

  // 删除一条id为test的数据
  manager.create({
  	path: 'delete', //如果不传则默认 delete
	params: { id: 'test' }
  })

  ```

  
##### 全局状态vuex store
-全局store包含菜单数据存储，登陆用户信息等 💼 src/store/modules/app.js


##### 基础方法
- 公共方法 💼 /src/utils/index.js
- 复制粘贴功能 💼 /src/utils/clipboard.js
- 公共表单校验 💼 /src/utils/validate.js



 
### 视图组件

##### Layout全局布局组件
- router主题内容 💼  /src/layout/components/AppMain
- 全局左侧菜单 💼  /src/layout/components/Sidebar
- 全局头部导航 💼  /src/layout/components/Navbar

##### PageContent列表页主题组件
一个列表视图页面的主题组件，组件引用了 `PageHeader` `PageSearsh` `PageTable` 

![](https://i.postimg.cc/K1CC7kWK/We-Chatab5fdb45b85b1f52831f260b1190ae7d.png)
```js
 // template
 <template>
   	 <page-content
        :header-content="headerContent"
        :search-content="searchContent"
        :table-content="tableContent"
    />
 <template/>
 <script>
    exprot default {
     data()  {
       headerContent: {...} //参考PageHeader  Attribute,
       searchContent: {...} //参考SearchContent  Attribute,
       tableContent: {...} //参考TableContent  Attribute
	 }
   }
 </script>
```

```js
  // 如果您更喜欢jsx的话， 需要引入PageContent组件下的/createPageContent.js
  import CreatePageContent from '@@/PageContent/createPageContent.js'
  export default createPageContent({
    headerContent: {...} //参考PageHeader  Attribute,
    searchContent: {...} //参考SearchContent  Attribute,
    tableContent: {...} //参考TableContent  Attribute
  })
```

------------



##### PageHeader头部内容

```js
 <template>
   	 <page-header :title="title" />
 <template/>
 <script>
   exprot default {
     data()  {
	   title: '订单列表'
	 }
   }
 </script>
```
##### PageHeader  Attribute
|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| title  | 内容标题  |  String, vnode |   - | -   |

------------

##### PageSearch头部内容

```js
 <template>
   <page-Searsh :formItems="formItems" />
 <template/>
 <script>
   exprot default {
     data()  {
	   formItems:[
	      {
		    id: 'name',
		    label: '名称',
			componentName: 'input'
		  },
		  {
		    label: () => ( <span>asdasd</span>	),
			items: [
				{
			 		id: 'city',
					label: '城市',
					componentName: "Select'',
					options: [
						{value: 'shanghai',  label: '上海'}
					],
                },
                {
                    id: 'region',
					label: '区域',
					componentName: "Select'',
					options: async (values) => {
					  const  {city}  = values
					  const { data } = await fetchGetRegion({ city })
					  return data
					}
                }
			]
		  }
	   ]
	 }
   }
 </script>
```
##### PageSearch  Attribute
|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| formItems  | 搜索项  | Array |   - | 必填   |

##### formItems-item Attribute
|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id  | 搜索需要的key  | String |   - | 必填   |
| label  | 大家都懂  | String, Function |   - | - |
| componentName  | 内部二次封装的组件名称，主要首字母大写  | String |  Input,Select | Input |
| options  | 如果componentName是Select，将需要这个参数， | Array，Function |  [{label: '北京', value: '北京'}]， 或者是一个方法的返回 | - |
------------

##### PageTable表格

基于 [el-table](https://element.eleme.cn/#/zh-CN/component/table) 作为基础ui组件，结合`manager.js` 做的系列的处理

   ```js
   <template>
   	 <page-table :resources="resources" :columns="columns" :actions="actions", :batchActions="batchActions"/>
   <template/>
   <script>
     export default {
	   data() {
	     return {
		 	resources: 'orders',
			columns: [
					{
						prop: 'title',
						 label: '名称'
					},
					{
						prop: 'status',
						 label: '状态',
						 render: ({ row })=> <status type={row.status} />
					},
				],
				actions: [
					{
						label: '删除',
						action: ({ row, pageTable }) => {}
					},
				],
				batchActions: [
					{
						label: '批量删除',
						action: ({ rows, pageTable }) => {}
					},
				],
			}
		}
	 }
   </script>
   ````
##### PageTable Attribute, 同时支持[el-table](https://element.eleme.cn/#/zh-CN/component/table#table-attributes)Attribute 

|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| resources  | 资源地址,也就是列表请求接口地址  |  String |  -  | 必传   |
|  queryParams |  列表调用接口查询时，带的默认参数 | Object, Function    | -   | -   |
|  columns | 列  | Array  | -  |  必传 |
| actions  |  列操作  |  Array | -  | -  |
| batchActions  |  批量操作  |  Array | -  | -  |

##### PageTable-columns Attribute

|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| label  | 列名称  |  String |  - | -   |
|  render | 自定显示内容   | Function({row, pageTable})    | -   | -   |

##### PageTable-actions Attribute

|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| label  | 操作按钮名称  |  String |  - | 操作   |
|  action | 按钮点击(click)时，触发的方法   | Function({row, pageTable})    | -   | -   |
|  subActions | 弹框形式展示更多操作   | Array   | -   | -   |

##### PageTable-actions-subActions Attribute

|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| label  | 操作按钮名称  |  String |  - | 操作   |
|  action | 按钮点击(click)时，触发的方法   | Function({row, pageTable})    | -   | -   |
------------

#### Drawer 页面抽屉组件

```js
<template>
	<Drawer> 
	<div slot="content">
		<h1>{{msg}}</h1>
	</div>
	</Drawer>
</template>
<script>
	export default {
		data() {
			return { msg: 'hello world' }
		}
 	}
</script>

```

```js
// 如果你更喜欢jsx的话，可以引入 Drawer组件目录下的createDrawer
const drawer = createDrawer({
    title: '这个一个抽屉',
    data() {
      return {
        msg: 'hello world'
      }
    }
    render() {
      return <div> <el-input v-model={this.model>} /> </div>
    }
})

```

##### Drawer抽屉 Attribute 
|  参数 |说明   |  类型 | 可选值  | 默认值   |
| ------------ | ------------ | ------------ | ------------ | ------------ |
|  visible | 是否打开Drawer | Boolean | true, false  |  false |
| customClass  |  Drawer className |  String |  - | -   |
|  size |  Drawer| String | small ,default, large  | default   |
|  title | Drawer标题| String | -  | -   |


##### Drawer Slots
| name  | 说明  |
| ------------ | ------------ |
| content  |  抽屉中心所需要展示的内容  |
| footer  |  如果需要自定义页脚的话  |

##### Drawer Event
| name  | 说明  |
| ------------ | ------------ |
| ok  | footer确认按钮触发的方法、如果ok事件并且没有自定义footer的情况下，Drawer自己添加页脚提交按钮和取消按钮    |
| close  |  footer取消按钮触发的方法 |




