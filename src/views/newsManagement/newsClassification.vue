<template>
  <div>
    <el-card shadow="hover">
      <h3>新闻分类</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="queryInfo">
        <el-form-item label="新闻分类名称">
          <el-input
            v-model.trim="queryInfo.name"
            clearable
            placeholder="新闻分类名称"
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
      <!-- 搜索 end -->
      <!-- 新增按钮 -->
      <div class="addClass">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addtNewstype"
          >新增</el-button
        >
      </div>
      <!-- 列表区域 -->
      <el-table :data="newstypeTableList" border height="57vh">
        <el-table-column prop="code" label="code值" align="center">
        </el-table-column>
        <el-table-column prop="name" label="新闻分类名称" align="center">
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
        :visible.sync="addNewstypeDialogVisible"
        @close="dialogVisibleClose"
        width="30%"
      >
        <el-form
          :model="newstypeForm"
          :rules="newstypeFormRules"
          ref="newstypeFormRefs"
          label-width="110px"
        >
          <el-form-item label="code值" prop="code">
            <el-input
              v-model="newstypeForm.code"
              placeholder="code值"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="新闻分类名称" prop="name">
            <el-input
              v-model.trim="newstypeForm.name"
              placeholder="新闻分类名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="status">
            <el-switch v-model="newstypeForm.status"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addNewstypeDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogBtn()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 弹框 end -->
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
      queryInfo: {
        code: '',
        name: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      },
      totals: 0,
      // 新增参数
      newstypeForm: {
        code: '',
        name: '',
        status: false
      },
      title: '添加新闻分类',
      addNewstypeDialogVisible: false, // 弹框
      newstypeFormRules: {
        code: [
          { required: true, message: '请输入code值', trigger: 'blur' },
          { validator: codeChange }
        ],
        name: [
          { required: true, message: '请输入新闻分类名称', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择是否有效', trigger: 'blur' }]
      },
      newstypeTableList: [] // 数据列表
    }
  },
  created() {
    this.getNewstypeTableList()
  },
  methods: {
    // 获取数据列表
    getNewstypeTableList() {
      this.$api.getNewstypeApi.getNewstypeData(this.queryInfo).then((res) => {
        console.log('列表', res)
        this.newstypeTableList = res.data.data
        this.totals = res.data.total
      })
    },
    // 搜索
    seachInfo() {
      this.queryInfo.pageIndex = 1
      this.getNewstypeTableList()
    },
    // 重置
    resetInfo() {
      this.queryInfo = {
        code: '',
        name: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      }
      this.getNewstypeTableList()
    },
    handleSizeChange(newPage) {
      this.queryInfo.pageSize = newPage
      this.getNewstypeTableList()
    },
    // 切换分页
    handleCurrentChange(newPage) {
      this.queryInfo.pageIndex = newPage
      this.getNewstypeTableList()
    },
    // 是否有效状态
    statusChange(row) {
      // 修改新闻分类状态
      const obj = {}
      obj.status = row.status
      this.$api.putNewstypeApi.putNewstype(row.id, obj).then((res) => {
        console.log('状态', res)
        this.$message.success('状态修改成功')
        this.getNewstypeTableList()
      })
    },
    // 新增按钮
    addtNewstype() {
      this.addNewstypeDialogVisible = true
      this.newstypeForm.name = ''
      this.newstypeForm.code = ''
      this.newstypeForm.status = true
    },
    // 添加确定按钮
    addDialogBtn() {
      this.$refs.newstypeFormRefs.validate((valid) => {
        if (!valid) return
        // 新增数据接口
        console.log('新增确定按钮')
        this.$api.postNewstypeApi
          .postNewstype(this.newstypeForm)
          .then((res) => {
            console.log('新增新闻分类', res)
            this.$message.success('添加成功')
            this.addNewstypeDialogVisible = false
            this.getNewstypeTableList()
          })
      })
    },
    // 重置表单
    dialogVisibleClose() {
      this.$refs.newstypeFormRefs.clearValidate()
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
