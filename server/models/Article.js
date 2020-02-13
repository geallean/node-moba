const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String }, // 标题
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], // 分类
    body: { type: String } // 详情
})

module.exports = mongoose.model('Article', schema)