// 定义分类接口
// 导出一个函数路由，在函数里面就可以使用最外层的app
module.exports = app => {
    const express = require('express')
    const CircularJSON = require('circular-json')
    // 定义express的子路由
    const router = express.Router()

    const Category = require('../../modules/Category')
    // 添加分类路由
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        // 发回客户端
        res.send(model)
    })

    // 分类列表路由
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        // 发回客户端
        res.send(items)
    })

    // 获取分类详情页接口
    router.get('/categories/:id', async (req, res) => {
        console.log(typeof req.params.id)
        const model = Category.findById(req.params.id)
        // console.log(CircularJSON.stringify(model))
        console.log(typeof model)
        res.send(CircularJSON.stringify(model))
    })
    // 将子路由挂载上去
    app.use('/admin/api', router)
}