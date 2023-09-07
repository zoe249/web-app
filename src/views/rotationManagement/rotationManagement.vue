<template>
  <div>
    <el-card shadow="hover">
      <h3>轮播列表</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="queryInfo">
        <el-form-item label="轮播图名称">
          <el-input
            v-model.trim="queryInfo.name"
            clearable
            placeholder="轮播图名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播类型">
          <!-- 取全部数据下拉 -->
          <el-select
            v-model="queryInfo.bannertypecode"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in bannertypecodeOptions"
              :key="item.value"
              :label="item.name"
              :value="item.code"
            >
              <span class="spanList">{{ item.code }}</span
              ><span class="spanList1">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="queryInfo.status" placeholder="是否有效">
            <el-option label="有效" value="true"></el-option>
            <el-option label="无效" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是大图">
          <el-select v-model="queryInfo.islarge" placeholder="是否大图">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
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
          @click="addBannerBtn"
          >新增</el-button
        >
      </div>
      <!-- 列表区域 -->
      <el-table :data="bannerTableList" border height="57vh">
        <el-table-column prop="displayorder" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="name" label="轮播图名称" align="center">
        </el-table-column>
        <el-table-column prop="bannertypecode" label="轮播类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.bannertypecode }}</span
            >-
            <span>{{ scope.row.bannertypename }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="轮播图片"
          align="center"
          class-name="img_center"
        >
          <template slot-scope="scope">
            <img class="imgClass" :src="scope.row.url" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="status" label="是否有效" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="statusChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="islarge" label="是否是大图" align="center">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.islarge === false"
              >否</el-tag
            >
            <el-tag type="success" v-if="scope.row.islarge === true">是</el-tag>
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
      <!-- 列表 end -->
      <!-- 公共弹框区域 -->
      <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="bannerDialogVisible"
        @close="dialogVisibleClose"
        width="50%"
      >
        <el-form
          :model="bannerForm"
          :rules="bannerFormRules"
          ref="bannerFormRefs"
          label-width="130px"
        >
          <el-form-item label="轮播图名称" prop="name">
            <el-input
              v-model.trim="bannerForm.name"
              placeholder="请输入轮播图名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="轮播类型" prop="bannertypecode">
            <!-- 取轮番有效分类数据 做下拉 -->
            <el-select
              v-model="bannerForm.bannertypecode"
              filterable
              placeholder="请选择"
              @visible-change="getBannertypecodeOptions(bannerForm.status)"
            >
              <el-option
                v-for="item in bannertypecodeOptions"
                :key="item.value"
                :label="item.name"
                :value="item.code"
              >
                <span class="spanList">{{ item.code }}</span
                ><span class="spanList1">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片" prop="url">
            <!-- FullScreen 1920*1080 -->
            <yp-single-upload
              :url.sync="bannerForm.url"
              utype="fullScreen"
            ></yp-single-upload>
          </el-form-item>
          <el-form-item label="排序" prop="displayorder">
            <el-input
              v-model.number="bannerForm.displayorder"
              placeholder="请输入排序"
              clearable
              @keyup.native="inputChangeNum"
              @keydown.native="inputChangeNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="status">
            <el-switch v-model="bannerForm.status"> </el-switch>
          </el-form-item>
          <el-form-item label="是否是大图" prop="islarge">
            <el-switch v-model="bannerForm.islarge"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bannerDialogVisible = false">取 消</el-button>
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
import YpSingleUpload from '../../components/upload/YpSingleUpload.vue'
export default {
  components: {
    YpSingleUpload
  },
  data() {
    // const displayorderChange = (rule, value, callback) => {
    //   const reg = /^\d+$|^\d+[.]?\d+$/
    //   if (!reg.test(value)) {
    //     callback(new Error('！必须是数字不可输入汉字、英文和特殊字符'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      // 搜索参数
      queryInfo: {
        name: '',
        bannertypecode: '',
        status: '',
        islarge: '',
        pageIndex: 1,
        pageSize: 20
      },
      totals: 0, // 总页数
      bannerDialogVisible: false, // 弹框
      editId: '', // 轮播id
      bannertypecodeOptions: [], // 轮播类型
      // 轮播类型参数
      bannertypecodeQueryInfo: {
        code: '', // code值
        name: '', // 轮播分类名称
        status: '', // 是否有效
        pageIndex: 1, // 单前页
        pageSize: 999999
      },
      bannerForm: {
        name: '',
        bannertypecode: '',
        url: '',
        status: true,
        displayorder: 0, // 排序
        islarge: ''
      },
      bannerFormRules: {
        name: [{ required: true, message: '请输入轮播名称', trigger: 'blur' }],
        bannertypecode: [
          { required: true, message: '请输入轮播类型', trigger: 'blur' }
        ],
        url: [{ required: true, message: '请上传轮播图片', trigger: 'blur' }],
        status: [{ required: true, message: '是否有效', trigger: 'blur' }],
        displayorder: [
          { required: true, message: '请输入轮播排序', trigger: 'blur' }
          // { validator: displayorderChange }
        ],
        islarge: [
          { required: true, message: '请选择是否是大图', trigger: 'blur' }
        ]
      },
      title: '新增',
      addDialogVisible: 'create',
      bannerTableList: [] // 轮播列表
    }
  },
  created() {
    this.getBannerTableList() // 获取数据列表
    this.getBannertypecodeOptions() // 获取轮播类型数据
  },
  methods: {
    // 获取轮播列表
    getBannerTableList() {
      this.$api.getBannertypeTableDataApi
        .getBannerData(this.queryInfo)
        .then((res) => {
          console.log('列表', res)
          this.bannerTableList = res.data.data
          this.totals = res.data.total
        })
    },
    // 获取轮播类型数据
    getBannertypecodeOptions(e) {
      console.log('eeeeee', e)
      this.$api.getBannertypeTableDataApi
        .getBannertypeTableData(this.bannertypecodeQueryInfo)
        .then((res) => {
          this.bannertypecodeOptions = res.data.data
          // const firstAll = {
          //   code: '',
          //   name: '全部'
          // }
        })
    },
    // 重置
    resetInfo() {
      this.queryInfo = {
        name: '',
        bannertypecode: '',
        status: '',
        islarge: '',
        pageIndex: 1,
        pageSize: 20
      }
      this.getBannerTableList()
    },
    // 查询
    seachInfo() {
      this.queryInfo.pageIndex = 1
      this.getBannerTableList()
    },
    handleSizeChange(newPage) {
      this.queryInfo.pageSize = newPage
      this.getBannerTableList()
    },
    // 切换分页
    handleCurrentChange(newPage) {
      this.queryInfo.pageIndex = newPage
      this.getBannerTableList()
    },
    // 是否有效
    statusChange(row) {
      // 修改轮播状态
      const obj = {}
      obj.status = row.status
      this.$api.putBannertypeTableApi
        .putBannerStatus(row.id, obj)
        .then((res) => {
          console.log('状态', res)
          this.$message.success('状态修改成功')
          this.getBannerTableList()
        })
    },
    // 是否是大图
    islargeChange() {},
    // 新增按钮
    addBannerBtn() {
      this.title = '添加轮播图'
      this.bannerDialogVisible = true
      this.bannerForm.name = ''
      this.bannerForm.bannertypecode = ''
      this.bannerForm.url = ''
      this.bannerForm.status = false
      this.bannerForm.displayorder = ''
      this.bannerForm.islarge = false
      // this.$refs.bannerFormRefs.resetField()
    },
    // 根据id查看编辑
    editBtn(row) {
      this.title = '编辑轮播图'
      this.bannerDialogVisible = true // 显示弹框
      this.addDialogVisible = 'edit'
      this.editId = row.id
      // 编辑接口
      this.$api.getBannertypeTableDataApi.getBannerById(row.id).then((res) => {
        console.log('编辑', res)
        this.bannerForm = res.data
      })
    },
    // 删除按钮
    async delectBtn(row) {
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
        this.$api.deleteBannertypeTableApi.deleteBanner(row.id).then((res) => {
          console.log('删除', res)
          this.$message.success('删除成功！')
          this.getBannerTableList()
        })
      }
    },
    // 重置表单
    dialogVisibleClose() {
      this.$refs.bannerFormRefs.clearValidate()
    },
    // 添加确定按钮
    addDialogBtn() {
      this.$refs.bannerFormRefs.validate((valid) => {
        if (!valid) return
        // 新增数据接口
        this.$api.postBannertypeTableApi
          .postBanner(this.bannerForm)
          .then((res) => {
            console.log('新增轮播', res)
            this.$message.success('添加成功')
            this.bannerDialogVisible = false
            this.getBannerTableList()
          })
      })
    },
    // 编辑确定按钮
    ediDialog() {
      this.$refs.bannerFormRefs.validate((valid) => {
        if (!valid) return
        console.log('this.editId', this.editId)
        // 编辑参数
        console.log('编辑参数', this.bannerForm)
        const obj = {
          name: this.bannerForm.name,
          bannertypecode: this.bannerForm.bannertypecode,
          url: this.bannerForm.url,
          status: this.bannerForm.status,
          displayorder: this.bannerForm.displayorder,
          islarge: this.bannerForm.islarge
        }
        // 接口
        this.$api.putBannertypeTableApi
          .putBannerById(this.editId, obj)
          .then((res) => {
            console.log('编辑确定', res)
            this.$message.success('修改成功')
            this.bannerDialogVisible = false
            this.getBannerTableList()
          })
      })
    },
    // 序号数字
    inputChangeNum() {
      this.bannerForm.displayorder = this.bannerForm.displayorder.replace(/[^/d]/g, '')
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
.spanList {
  float: left;
  font-size: 11px;
}
.spanList1 {
  float: right;
  color: #8492a6;
  font-size: 13px;
}
.imgClass {
  width: 54px;
  height: 54px;
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
