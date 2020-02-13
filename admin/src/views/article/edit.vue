<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <!-- 真正存进数据库的是id -->
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

       <el-form-item label="详情">
        <vue-editor v-model="model.body"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {}
  },
  data () {
    return {
      // 后台返回的数据
      model: {},
      categories: []
    }
  },
  components: {
    VueEditor
  },
  created () {
    // 自动执行方法获取 编辑分类的数据
    // 如果id存在，才执行fetch()方法
    this.id && this.fetch()
    this.fetchCategories()
  },
  methods: {
    async save () {
      console.log('save')
      let res
      if (this.id) { // id存在则put修改
        res = await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else { // 没有id则新增
        res = await this.$http.post('rest/articles', this.model)
      }
      console.log(res)
      this.$router.push('/articles/list').catch(err => { console.log(err) })
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // id存在时获取数据进行编辑
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      console.log(res)
      this.model = res.data
      //   console.log(this.model)
    },
    async fetchCategories () {
      // 直接使用分类列表获取
      const res = await this.$http.get('rest/categories')
      // console.log(res)
      this.categories = res.data
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
