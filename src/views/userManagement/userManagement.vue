<template>
  <div>
    <el-card shadow="hover">
      <h3>用户列表</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="queryInfo">
        <el-form-item label="账户">
          <el-input
            v-model.trim="queryInfo.username"
            clearable
            placeholder="账户"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            v-model.trim="queryInfo.nickname"
            clearable
            placeholder="用户昵称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-select v-model="queryInfo.status" placeholder="请选择用户状态">
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
          @click="addUserBtn"
          >新增</el-button
        >
      </div>
      <!-- 列表区域 -->
      <el-table :data="userTableData" border height="calc(57vh)">
        <el-table-column prop="username" label="账户" align="center">
        </el-table-column>
        <!-- <el-table-column prop="password" label="密码" align="center">
        </el-table-column> -->
        <el-table-column prop="nickname" label="用户昵称" align="center">
        </el-table-column>
        <el-table-column prop="status" label="用户状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="editBtn(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              @click="delectBtn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表区域 end -->
      <!-- 公共弹框 -->
      <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="userDialogVisible"
        @close="dialogVisibleClose"
        width="30%"
      >
        <el-form
          :model="userForm"
          :rules="userFormRules"
          ref="userFormRefs"
          label-width="100px"
        >
          <el-form-item label="账户" prop="username">
            <el-input
              :disabled="disabledusername"
              v-model.trim="userForm.username"
              placeholder="请输入账户"
              clearable
              @keyup.native="inputChangeEn"
              @keydown.native="inputChangeEn"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model.trim="userForm.password"
              type="password"
              show-password
              :disabled="disabledPassword"
              placeholder="请输入密码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input
              v-model.trim="userForm.nickname"
              placeholder="请输入用户昵称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户状态" prop="status">
            <el-switch v-model="userForm.status"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              addDialogVisible === 'create' ? addDialogBtn() : ediDialog()
            "
            >确 定</el-button
          >
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
    const changeName = (rule, value, cb) => {
      console.log('value', value)
      if (this.title !== '编辑用户') {
        this.editId = ''
      }
      if (value !== '') {
        // 接口
        this.$api.getUserTableDataApi
          .isExistUsername(this.userForm.username)
          .then((res) => {
            console.log('用户名存在', res)
            if (this.title === '编辑用户') {
              return cb()
            } else {
              if (!res.data.isExist === true) {
                return cb()
              } else {
                cb(new Error('输入的名称已存在'))
                console.log('111', res.data)
              }
            }
          })
      }
    }
    return {
      queryInfo: {
        username: '', // 账户
        nickname: '', // 用户昵称
        status: '', // 用户状态
        pageIndex: 1, // 当前页码
        pageSize: 20 // 当前条数
      },
      totals: 0, // 页总数
      disabledusername: false, // 账户禁用
      disabledPassword: false, // 密码禁用
      userDialogVisible: false, // 弹框
      addDialogVisible: 'create',
      title: '添加',
      userForm: {
        username: '',
        password: '',
        nickname: '',
        status: false
      },
      userFormRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          {
            validator: changeName
          }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        nickname: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请修改用户状态', trigger: 'blur' }]
      },
      editId: '', // 编辑id
      userTableData: [] // 列表数据
    }
  },
  created() {
    this.getUserTableData() // 获取数据列表
  },
  methods: {
    /**
     * 获取数据列表
     *
     */
    getUserTableData() {
      this.$api.getUserTableDataApi
        .getUserTableList(this.queryInfo)
        .then((res) => {
          console.log('用户列表', res)
          this.userTableData = res.data.data
          this.totals = res.data.total
        })
    },
    /**
     * 查询
     *
     */
    seachInfo() {
      this.queryInfo.pageIndex = 1
      this.getUserTableData()
    },
    // 重置按钮
    resetInfo() {
      this.queryInfo = {
        username: '', // 账户
        nickname: '', // 用户昵称
        status: '', // 用户状态
        pageIndex: 1, // 当前页码
        pageSize: 20 // 当前条数
      }
      this.getUserTableData()
    },
    handleSizeChange(newPage) {
      this.queryInfo.pageSize = newPage
      this.getUserTableData()
    },
    // 切换分页
    handleCurrentChange(newPage) {
      this.queryInfo.pageIndex = newPage
      this.getUserTableData()
    },
    /**
     * 添加按钮
     *
     */
    addUserBtn() {
      this.userDialogVisible = true // 显示弹框
      this.title = '添加用户'
      this.addDialogVisible = 'create'
      this.userForm.username = ''
      this.userForm.nickname = ''
      this.userForm.password = ''
      this.userForm.status = false
      this.disabledPassword = false // 密码禁用
      this.disabledusername = false // 账户禁用
    },
    /**
     * 编辑按钮
     *
     */
    editBtn(row) {
      this.userDialogVisible = true // 显示弹框
      this.title = '编辑用户'
      this.addDialogVisible = 'edit'
      this.editId = row
      this.disabledPassword = true // 密码禁用
      this.disabledusername = true // 账户禁用
      // 编辑接口
      this.$api.getUserTableDataApi.getEditUserTable(row.id).then((res) => {
        console.log('编辑', res)
        this.userForm = res.data[0]
      })
    },
    // 重置表单
    dialogVisibleClose() {
      this.$refs.userFormRefs.clearValidate()
    },
    // 新增确定按钮
    addDialogBtn() {
      this.$refs.userFormRefs.validate((valid) => {
        if (!valid) return
        // 新增数据接口
        this.$api.postUserTableDataApi
          .postUserTable(this.userForm)
          .then((res) => {
            console.log('新增用户', res)
            this.$message.success('添加成功')
            this.userDialogVisible = false
            this.getUserTableData()
          })
      })
    },
    // 编辑确定按钮
    ediDialog() {
      this.$refs.userFormRefs.validate((valid) => {
        if (!valid) return
        console.log('this.editId', this.editId)
        // 编辑参数
        const obj = {
          nickname: this.userForm.nickname,
          status: this.userForm.status
        }
        // 编辑接口
        this.$api.putUserTableDataApi
          .putUserBy(this.editId.id, obj)
          .then((res) => {
            console.log('编辑确定', res)
            this.$message.success('编辑成功')
            this.userDialogVisible = false
            this.getUserTableData()
          })
      })
    },
    // 删除按钮
    async delectBtn(row) {
      console.log('删除按钮', row)
      const confirmResult = await this.$confirm(
        '此操作将永久删除，是否继续？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      // 删除之前的判断
      if (confirmResult !== 'confirm') {
        return this.$message.info('您取消了删除')
        // 删除数据
      } else {
        // 删除接口
        this.$api.deleteUserTableDataApi.deleteUserTable(row.id).then((res) => {
          this.$message.success('删除成功！')
          this.getUserTableData()
        })
      }
    },
    // 状态
    statusChange(row) {
      console.log('row', row)
      // 修改状态接口
      const obj = {}
      obj.status = row.status
      this.$api.putUserTableDataApi.putUserStatus(row.id, obj).then((res) => {
        console.log('状态', res)
        this.$message.success('状态修改成功')
        this.getUserTableData()
      })
    },
    // 账户英文校验
    inputChangeEn() {
      this.userForm.username = this.userForm.username.replace(/[^a-zA-Z]+/g, '')
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
