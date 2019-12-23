const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String }//保存的是图片地址
})

module.exports = mongoose.model('Item', schema)