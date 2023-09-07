<template>
  <div>
    <el-card shadow="hover">
      <h3>新闻浏览排行榜</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 列表区域 -->
      <el-table
        :data="newsTableList"
        border
        height="75vh"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index" width="50" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="views" label="浏览量" align="center" sortable>
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" align="center">
        </el-table-column>
        <el-table-column prop="newstypecode" label="新闻类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.newstypecode }}</span
            >-
            <span>{{ scope.row.newstypename }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mainpicture" label="新闻封面图片" align="center">
          <template slot-scope="scope">
            <img class="imgClass" :src="scope.row.mainpicture" alt="" />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        title: '',
        newstypecode: '',
        status: true,
        pageIndex: 1,
        pageSize: 99999
      },
      newsTableList: [] // 列表数据
    }
  },
  created() {
    this.getNewsTableList() // 获取新闻列表
  },
  methods: {
    getNewsTableList() {
      this.$api.getNewstypeApi.getNewsData(this.queryInfo).then((res) => {
        console.log('列表', res)
        this.newsTableList = res.data.data
        this.totals = res.data.total
        this.newsTableList.sort(this.views_oder) // 排序
      })
    },
    views_oder(a, b) {
      return b.views - a.views // 从大到小排序
      // return a.views - b.views // 从小道大排序
    }
  }
}
</script>
<style lang="less">
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
@media screen and (max-height: 801px) {
  .el-card {
    --margin10: 10px;
  }
}
</style>
