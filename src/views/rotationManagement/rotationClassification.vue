<template>
  <div>
    <el-card shadow="hover">
      <h3>轮播分类</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="queryInfo">
        <el-form-item label="轮播分类名称">
          <el-input
            v-model.trim="queryInfo.name"
            clearable
            placeholder="轮播分类名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="queryInfo.status" placeholder="是否有效">
            <el-option label="有效" value="true"></el-option>
            <el-option label="无效" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetInfo">重置</el-button>
          <el-button type="primary" @click="seachInfo">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 搜索区域 end -->
      <!-- 新增按钮 -->
      <div class="addClass">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addBannertype"
          >新增</el-button
        >
      </div>
      <!-- 列表区域 -->
      <el-table :data="bannertypeTableList" border height="57vh">
        <el-table-column prop="code" label="code值" align="center">
        </el-table-column>
        <el-table-column prop="name" label="轮播分类名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="是否有效" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表区域 end -->
      <!-- 新增弹框 -->
      <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="addBannertypeDialogVisible"
        @close="dialogVisibleClose"
        width="30%"
      >
        <el-form
          :model="bannertypeForm"
          :rules="bannertypeFormRules"
          ref="bannertypeFormRefs"
          label-width="110px"
        >
          <el-form-item label="code值" prop="code">
            <el-input
              v-model="bannertypeForm.code"
              placeholder="code值"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="轮播分类名称" prop="name">
            <el-input
              v-model.trim="bannertypeForm.name"
              placeholder="轮播分类名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="status">
            <el-switch v-model="bannertypeForm.status"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addBannertypeDialogVisible = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="addDialogBtn()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页区域 -->
      <div class="pageClass">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageIndex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    const codeChange = (rule, value, callback) => {
      const reg = /^\d+$|^\d+[.]?\d+$/
      if (!reg.test(value)) {
        callback(new Error('！必须是数字不可输入汉字、英文和特殊字符'))
      } else {
        callback()
      }
    }
    return {
      // 搜索参数
      queryInfo: {
        code: '', // code值
        name: '', // 轮播分类名称
        status: '', // 是否有效
        pageIndex: 1, // 单前页
        pageSize: 20
      },
      totals: 0, // 总页数
      title: '添加轮播分类',
      addBannertypeDialogVisible: false, // 弹框
      bannertypeForm: {
        code: '',
        name: '',
        status: false
      },
      bannertypeFormRules: {
        code: [
          { required: true, message: '请输入code值', trigger: 'blur' },
          { validator: codeChange }
        ],
        name: [
          { required: true, message: '请输入轮播分类名称', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择是否有效', trigger: 'blur' }]
      },
      bannertypeTableList: [] // 列表数据
    }
  },
  created() {
    this.getbannertypeTableList()
  },
  methods: {
    // 获取轮播分类列表
    getbannertypeTableList() {
      this.$api.getBannertypeTableDataApi
        .getBannertypeTableData(this.queryInfo)
        .then((res) => {
          console.log('轮播列表数据', res)
          this.bannertypeTableList = res.data.data
          this.totals = res.data.total
        })
    },
    // 重置按钮
    resetInfo() {
      this.queryInfo = {
        code: '', // code值
        name: '', // 轮播分类名称
        status: '', // 是否有效
        pageIndex: 1, // 单前页
        pageSize: 20
      }
      this.getbannertypeTableList()
    },
    // 查询按钮
    seachInfo() {
      this.queryInfo.pageIndex = 1
      this.getbannertypeTableList()
    },
    handleSizeChange(newPage) {
      this.queryInfo.pageSize = newPage
      this.getbannertypeTableList()
    },
    // 切换分页
    handleCurrentChange(newPage) {
      this.queryInfo.pageIndex = newPage
      this.getbannertypeTableList()
    },
    // 新增按钮
    addBannertype() {
      this.addBannertypeDialogVisible = true
      this.bannertypeForm.code = ''
      this.bannertypeForm.name = ''
      this.bannertypeForm.status = true
    },
    // 状态
    statusChange(row) {
      console.log('row', row)
      // 修改轮播分类状态
      const obj = {}
      obj.status = row.status
      this.$api.putBannertypeTableApi.putBannertype(row.id, obj).then((res) => {
        console.log('状态', res)
        this.$message.success('状态修改成功')
        this.getbannertypeTableList()
      })
    },
    // 新增确定按钮
    addDialogBtn() {
      console.log('轮播新增确定按钮')
      this.$refs.bannertypeFormRefs.validate((valid) => {
        if (!valid) return
        // 新增数据接口
        this.$api.postBannertypeTableApi
          .postBannertype(this.bannertypeForm)
          .then((res) => {
            console.log('新增轮播', res)
            this.$message.success('添加成功')
            this.addBannertypeDialogVisible = false
            this.getbannertypeTableList()
          })
      })
    },
    // 重置表单
    dialogVisibleClose() {
      this.$refs.bannertypeFormRefs.clearValidate()
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin: var(--margin10, 20px);
}
// 分页样式
.pageClass {
  text-align: right;
  margin-top: 20px;
}
// 新增按钮样式
.addClass {
  margin-bottom: 20px;
}
// 弹框样式
/deep/.el-dialog__header {
  padding: 20px 20px 10px;
  background-color: #409eff;
  color: white;
}
// 弹框标题
/deep/.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  color: white;
}
// 弹框叉号
/deep/.el-icon-close:before {
  content: '\e6db';
  color: white;
}
@media screen and (max-height: 801px) {
  .el-card {
    --margin10: 10px;
  }
}
</style>
