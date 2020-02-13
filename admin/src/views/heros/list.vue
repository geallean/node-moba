<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="heros">
      <el-table-column prop="_id" label="ID" width="230"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="avatar" label="英雄图标">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:3rem" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/heros/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      heros: []
    }
  },
  created () {
    // 放在这里自动执行
    this.fetch()
  },
  methods: {
    // 请求获取所有物品列表
    async fetch () {
      const res = await this.$http.get('rest/heros')
      this.heros = res.data
      console.log(this.heros)
    },
    // 删除一行数据
    async remove (row) {
      this.$confirm(`是否删除物品-${row.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 请求删除的接口
        const res = await this.$http.delete(`rest/heros/${row._id}`)
        console.log(res)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
