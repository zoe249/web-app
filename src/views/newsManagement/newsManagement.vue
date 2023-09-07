<template>
  <div>
    <el-card shadow="hover">
      <h3>新闻列表</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 搜索区域 -->
      <el-form :inline="true" :model="queryInfo">
        <el-form-item label="新闻标题">
          <el-input
            v-model.trim="queryInfo.title"
            clearable
            placeholder="新闻标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="新闻类型">
          <!-- 取全部数据下拉 -->
          <el-select
            v-model="queryInfo.newstypecode"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in newstypecodeOptions"
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
        <el-form-item>
          <el-button @click="resetInfo">重置</el-button>
          <el-button type="primary" @click="seachInfo">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 新增按钮 -->
      <div class="addClass">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          @click="addNewstype"
          >新增</el-button
        >
      </div>
      <!-- 列表区域 -->
      <el-table :data="newsTableList" border height="57vh">
        <el-table-column prop="title" label="新闻标题" align="center">
        </el-table-column>
        <el-table-column prop="newstypecode" label="新闻类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.newstypecode }}</span
            >-
            <span>{{ scope.row.newstypename }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="views" label="浏览量" align="center">
        </el-table-column>
        <!-- <el-table-column prop="digest" label="新闻摘要" align="center" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column prop="mainpicture" label="新闻封面图片" align="center">
          <template slot-scope="scope">
            <img class="imgClass" :src="scope.row.mainpicture" alt="" />
          </template>
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
      <!-- 公共弹框 -->
      <el-dialog
        :title="title"
        :close-on-click-modal="false"
        :visible.sync="newsDialogVisible"
        @close="dialogVisibleClose"
        width="50%"
      >
        <el-form
          :model="newsForm"
          :rules="newsFormRules"
          ref="newsFormRefs"
          label-width="120px"
        >
          <el-form-item label="新闻标题" prop="title">
            <el-input
              v-model.trim="newsForm.title"
              placeholder="请输入新闻标题"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="新闻类型" prop="newstypecode">
            <el-select
              v-model="newsForm.newstypecode"
              filterable
              placeholder="请选择"
              @visible-change="
                getNewstypecodeOptions(getNewstypecodeQueryInfo.status)
              "
            >
              <el-option
                v-for="item in newstypecodeOptions"
                :key="item.value"
                :label="item.name"
                :value="item.code"
              >
                <span class="spanList">{{ item.code }}</span
                ><span class="spanList1">{{ item.name }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="新闻摘要" prop="digest">
            <el-input
              type="textarea"
              v-model.trim="newsForm.digest"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="请输入新闻摘要"
              clearable
            ></el-input>
            <!-- <yp-quill-editor :content.sync="newsForm.digest"></yp-quill-editor> -->
          </el-form-item>
          <el-form-item label="新闻内容" prop="content">
            <yp-quill-editor :content.sync="newsForm.content"></yp-quill-editor>
          </el-form-item>
          <el-form-item label="新闻封面图片" prop="mainpicture">
            <yp-single-upload
              :url.sync="newsForm.mainpicture"
              utype="fullScreen"
            ></yp-single-upload>
          </el-form-item>
          <el-form-item label="是否有效" prop="status">
            <el-switch v-model="newsForm.status"> </el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="newsDialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              addDialogVisible === 'create' ? addDialogBtn() : ediDialog()
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 公共弹框 end -->
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
import YpSingleUpload from '../../components/upload/YpSingleUpload.vue' // 上传图片
import YpQuillEditor from '../../components/editor/YpQuillEditor.vue' // 富文本编译器
export default {
  components: {
    YpSingleUpload,
    YpQuillEditor
  },
  data() {
    return {
      // 搜索参数
      queryInfo: {
        title: '',
        newstypecode: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      },
      totals: 0,
      title: '添加新闻',
      newsDialogVisible: false, // 弹框
      newstypecodeOptions: [], // 新闻类型
      addDialogVisible: 'create',
      newsForm: {
        title: '', // 新闻标题
        newstypecode: '', // 新闻类型code
        digest: '', // 新闻摘要
        content: '', // 新闻内容
        status: true, // 是否有效
        mainpicture: '' // 新闻封面图片
      },
      newsFormRules: {
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        newstypecode: [
          { required: true, message: '请输入新闻类型', trigger: 'blur' }
        ],
        digest: [
          { required: true, message: '请输入新闻摘要', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入新闻内容', trigger: 'blur' }
        ],
        // status: [
        //   { required: true, message: '请选择是否有效', trigger: 'blur' }
        // ],
        mainpicture: [
          { required: true, message: '请上传新闻封面图片', trigger: 'blur' }
        ]
      },
      getNewstypecodeQueryInfo: {
        code: '',
        name: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      },
      editId: '', // 编辑id
      newsTableList: [] // 列表数据
    }
  },
  created() {
    this.getNewsTableList() // 获取新闻列表
    this.getNewstypecodeOptions() // 获取新闻类型
  },
  methods: {
    // 获取新闻列表
    getNewsTableList() {
      this.$api.getNewstypeApi.getNewsData(this.queryInfo).then((res) => {
        console.log('列表', res)
        this.newsTableList = res.data.data
        this.totals = res.data.total
      })
    },
    // 获取新闻类型
    getNewstypecodeOptions(e) {
      console.log('eeeeee', e)
      this.$api.getNewstypeApi
        .getNewstypeData(this.getNewstypecodeQueryInfo)
        .then((res) => {
          this.newstypecodeOptions = res.data.data
        })
    },
    // 重置
    resetInfo() {
      this.queryInfo = {
        title: '',
        newstypecode: '',
        status: '',
        pageIndex: 1,
        pageSize: 20
      }
      this.getNewsTableList()
    },
    // 查询
    seachInfo() {
      this.queryInfo.pageIndex = 1
      this.getNewsTableList()
    },
    handleSizeChange(newPage) {
      this.queryInfo.pageSize = newPage
      this.getNewsTableList()
    },
    // 切换分页
    handleCurrentChange(newPage) {
      this.queryInfo.pageIndex = newPage
      this.getNewsTableList()
    },
    // 新增按钮
    addNewstype() {
      this.newsDialogVisible = true
      this.title = '添加新闻'
      this.addDialogVisible = 'create'
      this.newsForm.title = ''
      this.newsForm.newstypecode = ''
      this.newsForm.digest = ''
      this.newsForm.content = ''
      this.newsForm.status = true
      this.newsForm.mainpicture = ''
    },
    // 状态
    statusChange(row) {
      // 修改新闻状态
      const obj = {}
      obj.status = row.status
      this.$api.putNewstypeApi.putNewsStatus(row.id, obj).then((res) => {
        console.log('状态', res)
        this.$message.success('状态修改成功')
        this.getNewsTableList()
      })
    },
    // 添加确定按钮
    addDialogBtn() {
      this.$refs.newsFormRefs.validate((valid) => {
        if (!valid) return
        // 新增数据接口
        this.$api.postNewstypeApi.postAddNews(this.newsForm).then((res) => {
          console.log('新增', res)
          this.newsDialogVisible = false
          this.$message.success('添加成功')
          this.getNewsTableList()
        })
      })
    },
    // 根据id编辑
    editBtn(row) {
      this.title = '编辑新闻'
      this.newsDialogVisible = true // 显示弹框
      this.addDialogVisible = 'edit'
      this.editId = row.id
      // 编辑接口
      this.$api.getNewstypeApi.getNewsId(row.id).then((res) => {
        console.log('编辑', res)
        this.newsForm = res.data
      })
    },
    // 编辑确定按钮
    ediDialog() {
      this.$refs.newsFormRefs.validate((valid) => {
        if (!valid) return
        console.log('this.editId', this.editId)
        // 编辑参数
        console.log('编辑参数', this.newsForm)
        const obj = {
          title: this.newsForm.title,
          newstypecode: this.newsForm.newstypecode,
          digest: this.newsForm.digest,
          content: this.newsForm.content,
          status: this.newsForm.status,
          mainpicture: this.newsForm.mainpicture
        }
        // 根据id修改新闻接口
        this.$api.putNewsApi.putNewsEditById(this.editId, obj).then((res) => {
          console.log('编辑确定', res)
          this.$message.success('修改成功')
          this.newsDialogVisible = false
          this.getNewsTableList()
        })
      })
    },
    // 新闻列表删除
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
        this.$api.deleteNewsListApi.deleteNewsList(row.id).then((res) => {
          console.log('删除', res)
          this.$message.success('删除成功！')
          this.getNewsTableList()
        })
      }
    },
    // 重置表单
    dialogVisibleClose() {
      this.$refs.newsFormRefs.clearValidate()
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
.spanList {
  float: left;
  font-size: 11px;
}
.spanList1 {
  float: right;
  color: #8492a6;
  font-size: 13px;
}
// 图片样式
.imgClass {
  width: 54px;
  height: 54px;
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
