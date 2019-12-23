<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
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
      model: {}
    }
  },
  created () {
    // 自动执行方法获取 编辑分类的数据
    // 如果id存在，才执行fetch()方法
    this.id && this.fetch()
  },
  methods: {
    async save () {
      console.log('save')
      let res
      if (this.id) { // id存在则put修改
        res = await this.$http.put(`rest/items/${this.id}`, this.model)
      } else { // 没有id则新增
        res = await this.$http.post('rest/items', this.model)
      }
      console.log(res)
      this.$router.push('/items/list').catch(err => { console.log(err) })
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // id存在时获取数据进行编辑
    async fetch () {
      const res = await this.$http.get(`rset/items/${this.id}`)
      console.log(res)
      this.model = res.data
      //   console.log(this.model)
    }
  }
}
</script>

<style scoped>
</style>
