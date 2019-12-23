<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请输入内容">
          <!-- 真正存进数据库的是id -->
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      // 后台返回的数据
      model: {},
      // 父级的选项
      parents: []
    }
  },
  created () {
    // 自动执行方法获取 编辑分类的数据
    // 如果id存在，才执行fetch()方法
    this.id && this.fetch()
    this.fetchParents()
  },
  methods: {
    async save () {
      console.log('save')
      let res
      if (this.id) { // id存在则put修改
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else { // 没有id则新增
        res = await this.$http.post('rest/categories', this.model)
      }
      console.log(res)
      this.$router.push('/categories/list').catch(err => { console.log(err) })
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // id存在时获取数据进行编辑
    async fetch () {
      const res = await this.$http.get(`rset/categories/${this.id}`)
      console.log(res)
      this.model = res.data
      //   console.log(this.model)
    },
    async fetchParents () {
      // 直接使用分类列表获取
      const res = await this.$http.get('rest/categories')
      console.log(res)
      this.parents = res.data
    }
  }
}
</script>

<style scoped>
</style>
