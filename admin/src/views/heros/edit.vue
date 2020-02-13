<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>

          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <!-- 将图片地址赋值到src -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.difficult" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.skills" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.attack" :max="9" show-score></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.7rem" v-model="model.scores.survive" :max="9" show-score></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>

          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>

          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <!-- 将图片地址赋值到src -->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem">
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
      categories: [], // 分类
      items: [], // 顺风出装，逆风出装物品
      // 后台返回的数据
      model: {
        name: '',
        avatar: '',
        scores: {},
        skills: [] // 添加技能
      }
    }
  },
  created () {
    // 自动执行方法获取 编辑分类的数据
    // 如果id存在，才执行fetch()方法
    this.id && this.fetch()
    this.fetchCategories() // 分类
    this.fetchItems() // 顺风出装物品
  },
  methods: {
    async save () {
      console.log('save')
      let res
      if (this.id) { // id存在则put修改
        res = await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else { // 没有id则新增
        res = await this.$http.post('rest/heros', this.model)
      }
      console.log(res)
      this.$router.push('/heros/list').catch(err => { console.log(err) })
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    // id存在时获取数据进行编辑
    async fetch () {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      console.log(res)
      // 将服务端的数据完整替换到model上面，服务端数据会覆盖前端定义
      // this.model = res.data
      this.model = Object.assign({}, this.model, res.data)
    },
    // 获取分类数据
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      // console.log(res)
      this.categories = res.data
    },
    // 获取顺风出装物品数据
    async fetchItems () {
      const res = await this.$http.get(`rest/items`)
      // console.log(res)
      this.items = res.data
    },
    // 上传图片后的回调
    afterUpload (res) {
      // vue 中的显示赋值 this.$set(object, propertyName, value)
      this.$set(this.model, 'avatar', res.url)
      this.model.icon = res.url
      console.log(res)
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
