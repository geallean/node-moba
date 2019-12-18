const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String }
})

// 导出mongoose的模型，哪里需要哪里用
module.exports = mongoose.model('Category',schema)