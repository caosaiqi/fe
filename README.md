
资源 order为例	请求方式	请求地址	接口数据格式
order	GET	
列表

[BASE_URL]/mall/order

Request Query

{

page: 1, // [int] 请求页

pageSize: 15 // [int] 当前页显示[15]条数据

... // 更多参数

}



Response Body

请求成功

{

status: 200, // [int]接口状态

data: {

list: [], // [array]当前页数据

 total: 150, // [int]当前资源共[150]条数据

}

msg: '' [string || undefined],

sys_msg: '' [string || undefined]

}

请求失败 (理论上code 不是200 都是失败)

{

status: 500, // [int]接口状态

message: '服务器异常' // [string]异常原因

}




获取详情

[BASE_URL]/mall/order/detail

或者

[BASE_URL]/mall/order/[id]

Request Query

{

id: [id] // 查询ID

}





Response Body 

请求成功

{

 status: 200,

 data: {

 name: 'test',

 ....

 },

 message: ''

}

请求失败

{

 status: 500,

 message: '失败原因'

}



POST

新建

[BASE_URL]/mall/order

Request Body

{

 name: test,

 ....

}





Response Body 

请求成功

{

 status: 200,

 data: {

 name: 'test',

 ....

 },

 message: ''

}



修改失败 (理论上code 不是200 都是失败)

{

 status: 500, // [int] 失败状态码

 message: [服务器异常 ], // [string] 异常原因

}





修改资源信息

[BASE_URL]/mall/order/[remark]



Request Body

{

 id: [要修改的资源id],

 remark: [要修改的字段]

}



Response Body 

修改成功

{

 status: 200, // [int]成功状态码

 data: {

 remark: **, 

 ...,

 }

 message: '', // [string || undefined] 前端界面需要显示的消息

}





修改失败 (理论上code 不是200 都是失败)

{

 status: 500], // [int] 失败状态码

 message: [服务器异常 ], // [string] 异常原因

}



