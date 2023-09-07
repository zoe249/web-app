<template>
  <div>
    <!-- 列表子组件 -->
    <el-table :data="tableList" border :height="height">
      <el-row v-for="(item, index) in propArr" :key="index">
        <!-- type值为 'index' 状态为index -->
        <el-table-column v-if="item.type === 'index'" type="index">
        </el-table-column>
        <!-- type值为 'switch' 状态为滑块 -->
        <el-table-column
          v-else-if="item.type === 'switch'"
          :prop="item.props"
          :label="item.label"
          :align="item.align"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row[item.props]"
              @change="servicePublishChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <!-- type值为'image' 状态为图片 -->
        <el-table-column
          v-else-if="item.type === 'image'"
          :prop="item.props"
          :label="item.label"
          :align="item.align">
          <template slot-scope="scope">
            <!-- <img
              class="imgClass"
              :src="scope.row[item.props] ? scope.row[item.props] : noAvatar"
              alt=""
            /> -->
            <img class="imgClass" :src="scope.row[item.props]" alt="" />
          </template>
        </el-table-column>
        <!-- type值为'operation' 状态为操作 -->
        <el-table-column
          v-else-if="item.type === 'operation'"
          :label="item.label"
          :align="item.align"
        >
          <!-- 按钮插槽 -->
          <template slot-scope="scope">
            <slot name="button" :scope="scope.row"></slot>
          </template>
        </el-table-column>
        <!-- type值为'status' 状态为判断转化值 -->
        <el-table-column
          v-else-if="item.type === 'status'"
          :prop="item.props"
          :label="item.label"
          :align="item.align"
        >
          <template slot-scope="scope">
            {{ item.render(scope.row) }}
          </template>
        </el-table-column>
        <!-- 默认 -->
        <el-table-column
          v-else
          :prop="item.props"
          :label="item.label"
          :align="item.align"
        ></el-table-column>
      </el-row>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    // 列表信息
    propArr: {
      type: Array
    },
    // 展示列表
    listInfo: {
      type: Array
    },
    // 列表高度
    height: {
      type: String
    }
  },
  data() {
    return {
      noAvatar: '',
      tableList: [] // 数据
    }
  },
  methods: {
    // 滑块事件
    servicePublishChange(row) {
      console.log('row滑块', row)
      this.$emit('swichChange', row)
    }
  },
  watch: {
    listInfo: function (val) {
      console.log('状态val', val)
      this.tableList = val // 赋值
    }
  }
}
</script>
<style lang="less" scoped>
// 图片样式
.imgClass {
  width: 54px;
  height: 54px;
}
</style>
