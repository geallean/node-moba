// 定义分类接口
// 导出一个函数路由，在函数里面就可以使用最外层的app
module.exports = app => {
    const express = require('express')
    // const CircularJSON = require('circular-json')
    const util = require('util')
    const EventEmitter = require('events')
    // 定义express的子路由
    const router = express.Router({
        mergeParams: true
    })

    // const Category = require('../../models/Category')

    // 添加分类
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        // 发回客户端
        res.send(model)
    })

    // 分类列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === "Category") {
            queryOptions.populate = 'parent'
        }
        // const items = await req.Model.find().populate('parent').limit(10)
        const items = await req.Model.find().setOptions(queryOptions).limit(10)

        // 发回客户端
        res.send(items)
    })

    // 获取分类详情返回到修改界面展示
    router.get('/:id', async (req, res) => {
        console.log(typeof req.params.id)
        const model = req.Model.findById(req.params.id, (err, data) => {
            console.log(data)
            res.send(data)
        })
    })

    // 修改分类 传回后端储存
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        // 发回客户端
        res.send(model)
    })

    // 删除分类
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        // 发回客户端
        res.send({
            success: true
        })
    })

    // 将子路由挂载上去
    // 将接口做成动态的
    app.use('/admin/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        console.log(req.params.resource, modelName)
        // 表示给请求对象上面挂载一个属性model，是require进来的模型
        // 这样在后续的请求中就可以用上一个请求进来的req.Model
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}