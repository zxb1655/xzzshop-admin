<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <router-link to="/dashboard/comment/add">
          <el-button type="primary" icon="plus">添加评论</el-button>
        </router-link>
      </div>
    </div>
    <div class="content-main">
      <div class="filter-box">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="关联商品">
            <el-input v-model="filterName" placeholder="商品id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="form-table-box">
        <el-table :data="tableData" style="width: 100%" border stripe>
          <el-table-column prop="id" label="ID" width="70px"></el-table-column>
          <el-table-column prop="name" label="评论人"></el-table-column>
          <el-table-column prop="avatar" label="评论人头像"></el-table-column>
          <el-table-column prop="content" label="评论内容"></el-table-column>
          <el-table-column prop="goods_id" label="关联商品"></el-table-column>
          <el-table-column prop="sort_order" label="排序" width="100" sortable>
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.sort_order"
                placeholder="排序"
                @blur="submitSort(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="enabled" label="状态" width="80px">
            <template slot-scope="scope">
              {{ scope.row.enabled == 1 ? '启用' : '禁用' }}
            </template>
          </el-table-column>
          <el-table-column label="开启状态" width="80">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.enabled"
                active-text=""
                inactive-text=""
                @change="changeStatus($event, scope.row.id)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-box">
        <el-pagination
          @current-change="handlePageChange"
          :current-page="page"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      total: 0,
      filterName: '',
      filterForm: {
        name: ''
      },
      tableData: []
    }
  },
  methods: {
    test() {
      console.log(this.tableData)
    },
    submitSort(index, row) {
      this.axios.post('comment/updateSort', { id: row.id, sort: row.sort_order }).then(response => {})
    },
    changeStatus($event, para) {
      this.axios
        .get('comment/saleStatus', {
          params: {
            status: $event,
            id: para
          }
        })
        .then(response => {})
    },
    handlePageChange(val) {
      this.page = val
      //保存到localStorage
      localStorage.setItem('adPage', this.page)
      localStorage.setItem('adFilterForm', JSON.stringify(this.filterForm))
      this.getList()
    },
    handleRowEdit(index, row) {
      this.$router.push({ name: 'comment_add', query: { id: row.id } })
    },
    handleRowDelete(index, row) {
      this.$confirm('确定要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('comment/destory', { id: row.id }).then(response => {
          console.log(response.data)
          if (response.data.errno === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })

            this.getList()
          }
        })
      })
    },
    onSubmitFilter() {
      this.page = 1
      this.getList()
    },
    getList() {
      this.axios
        .get('comment', {
          params: {
            page: this.page,
            name: this.filterName
          }
        })
        .then(response => {
          this.tableData = response.data.data.data
          this.page = response.data.data.currentPage
          this.total = response.data.data.count
        })
      console.log(this.tableData)
    }
  },
  components: {},
  mounted() {
    this.getList()
  }
}
</script>

<style scoped></style>
