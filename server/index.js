const express = require('express')

// 创建express实例
const app = express()

// 连接数据库
const mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/node-moba', { useUnifiedTopology: true, useNewUrlParser: true })

// 引用中间件
app.use(express.json())
// 跨域中间件，返回的是一个函数，所以要执行
app.use(require('cors')())

app.use('/uploads',express.static(__dirname + '/uploads'))

// 分类的路由放到routers文件夹下
// 使routes文件夹下的文件可以使用app实例，因为routes文件夹下的文件导出的是一个函数
require('./routers/admin')(app)
require('./plugins/db')(app)

// 监听端口，回调函数表示启动之后做什么
app.listen(3000, () => {
    console.log('node-moba服务器已启动，http://localhost:3000')
})