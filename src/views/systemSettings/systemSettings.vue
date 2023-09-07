<template>
  <div>
    <el-card shadow="hover">
      <h3>主题设置</h3>
    </el-card>
    <el-card shadow="hover">
      <!-- 列表区域 -->
      <TableCom
        :propArr="propArrList"
        :listInfo="settingList"
        @swichChange="statusChange"
        height="75vh"
      ></TableCom>
    </el-card>
  </div>
</template>
<script>
import TableCom from '../../components/tableCom/tableCom.vue' // 列表组件
export default {
  components: {
    TableCom
  },
  data() {
    return {
      propArrList: [
        { props: 'status', label: '状态', align: 'center', type: 'switch' },
        { props: 'code', label: 'code', align: 'center' },
        { props: 'name', label: '名字', align: 'center' }
      ],
      settingList: [] // 数据列表
    }
  },
  created() {
    this.getSettingList() // 获取数据列表
  },
  methods: {
    // 获取数据列表
    getSettingList() {
      this.$api.getSettingApi.getSettingList().then((res) => {
        console.log('列表数据', res)
        this.settingList = res.data
      })
    },
    // 修改状态
    statusChange(row) {
      console.log('状态', row)
      const obj = {}
      obj.status = row.status
      this.$api.putSettingApi.putSetting(row.id, obj).then((res) => {
        console.log('状态', res)
        this.$message.success('状态修改成功')
        this.getSettingList()
      })
    }
  }
}
</script>
<style lang="less" scoped>
.el-card {
  margin: var(--margin10, 20px);
}
.el-form-item {
  margin-bottom: 10px;
}
@media screen and (max-height: 801px) {
  .el-card {
    --margin10: 10px;
  }
}
</style>
