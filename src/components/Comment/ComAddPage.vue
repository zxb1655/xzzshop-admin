<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'ad' }">评论列表</el-breadcrumb-item>
        <el-breadcrumb-item>{{ infoForm.id ? '编辑评论' : '添加评论' }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <!--<el-button type="primary" @click="test" icon="arrow-left">test</el-button>-->
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :model="infoForm" label-width="120px">
          <el-form-item label="评论人" prop="name">
            <el-input class="link-input" v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="评论人头像" prop="avatar">
            <el-input class="link-input" v-model="infoForm.avatar"></el-input>
          </el-form-item>
          <el-form-item label="评论内容" prop="content">
            <el-input class="link-input" v-model="infoForm.content"></el-input>
          </el-form-item>
          <el-form-item label="评论图片" prop="image_url">
            <el-tag
              :key="item"
              v-for="item in infoForm.image_url"
              closable
              :disable-transitions="false"
              @close="handleClose(item)"
            >
              {{ item }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 图片链接</el-button>
          </el-form-item>
          <el-form-item label="商品id" prop="goods_id">
            <el-input class="id-input" v-model="infoForm.goods_id"></el-input>
            <el-popover placement="right" v-model="related_pop">
              <el-table :data="chooseRelateGoods" stripe style="width: 100%">
                <el-table-column prop="id" label="id" width="100"></el-table-column>
                <el-table-column prop="list_pic_url" label="商品图片" width="120">
                  <template slot-scope="scope">
                    <img :src="scope.row.list_pic_url" alt="" style="width: 40px; height: 40px" />
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="300px"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="relateSelect(scope.row.id)">选择 </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-button slot="reference" type="primary" @click="relateGoodsClick">添加关联商品</el-button>
            </el-popover>
          </el-form-item>
          <el-form-item label="排序" prop="sort_order">
            <el-input-number v-model="infoForm.sort_order" :min="1" :max="999"></el-input-number>
          </el-form-item>
          <el-form-item label="是否启用">
            <el-switch active-value="1" inactive-value="0" v-model="infoForm.enabled"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
            <el-button @click="goBackPage">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      infoForm: {
        id: 0,
        nama: '',
        avatar: 'https://cdn.jzzz66.cn/a16.jpg',
        content: '',
        image_url: [],
        enabled: 0,
        goods_id: 0,
        sort_order: 1
      },
      chooseRelateGoods: [],
      related_pop: false
    }
  },
  methods: {
    handleClose(tag) {
      this.infoForm.image_url.splice(this.infoForm.image_url.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.infoForm.image_url.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    relateSelect(id) {
      this.infoForm.goods_id = id
      this.related_pop = false
    },
    relateGoodsClick() {
      this.axios.post('comment/getallrelate', { id: this.infoForm.id }).then(response => {
        if (response.data.errno === 0) {
          this.chooseRelateGoods = response.data.data
        }
      })
    },
    test() {
      console.log(this.infoForm.end_time)
    },
    goBackPage() {
      this.$router.go(-1)
    },
    onSubmitInfo() {
      console.log(this.infoForm)
      if (this.infoForm.goods_id == 0) {
        this.$message({
          type: 'error',
          message: '请选择商品'
        })
        return false
      }
      this.$refs['infoForm'].validate(valid => {
        if (valid) {
          this.axios.post('comment/store', this.infoForm).then(response => {
            if (response.data.errno === 0) {
              this.$message({
                type: 'success',
                message: '保存成功'
              })
              this.$router.go(-1)
            } else {
              this.$message({
                type: 'error',
                message: '保存失败'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    getInfo() {
      if (this.infoForm.id <= 0) {
        return false
      }
      //加载广告详情
      let that = this
      this.axios
        .get('comment/info', {
          params: {
            id: that.infoForm.id
          }
        })
        .then(response => {
          let resInfo = response.data.data
          resInfo.enabled = resInfo.enabled ? '1' : '0'
          that.infoForm = resInfo
          console.log(this.infoForm)
        })
    }
  },
  components: {},
  mounted() {
    this.infoForm.id = this.$route.query.id || 0
    this.getInfo()
  }
}
</script>

<style scoped>
.image-show {
  background-color: #f8f8f8;
  min-width: 200px;
  height: 200px;
  display: block;
}

.id-input {
  margin-bottom: 20px;
}

.link-input .el-input__inner {
  width: 400px !important;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
